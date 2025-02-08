import { env } from "@/env";
import { createCustomer } from "@/use-cases/stripe/create-customer";
import { createUser } from "@/use-cases/user/create-user";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "./lib/schemas/user";
import { getSubscriptionByUser } from "./use-cases/subscription/get-subscription-by-user";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  callbacks: {
    async jwt({ token, account, trigger }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (!token.email) return token;

      let user: User | undefined | null = await createUser({
        email: token.email,
        name: token.name as string,
        image: token.picture as string,
      });

      let planName: string | undefined;

      if (user) {
        createCustomer(user);

        const subscription = await getSubscriptionByUser({ userId: user.id });

        planName = subscription?.plan.name;
      }

      token.id = user?.id;
      token.planName = planName;
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      (session as any).user.id = token.id;
      (session as any).user.planName = token.planName;

      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      const createdUser = await createUser(user as User);
      if (!createdUser) return;
      createCustomer(createdUser);
    },
  },
};
