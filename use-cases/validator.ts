import { AuthenticatedUser } from "@/types/autenticate-user";
import { getServerSession } from "next-auth";
import { ZodRawShape, z } from "zod";

type ValidatorProps<T extends ZodRawShape, K> = {
  input: z.ZodObject<T>;
  handler: (
    data: z.infer<z.ZodObject<T>>,
    user: AuthenticatedUser
  ) => Promise<K>;
};

export function validator<T extends ZodRawShape, K>({
  input,
  handler,
}: ValidatorProps<T, K>) {
  return async function (data: z.infer<typeof input>) {
    const parse = input.safeParse(data);

    if (!parse.success) {
      throw new Error(parse.error.errors[0].message);
    }

    const session = await getServerSession();

    if (!session?.user || !session.user.email) {
      throw new Error("Unauthorized");
    }

    return handler(parse.data, session.user as AuthenticatedUser);
  };
}
