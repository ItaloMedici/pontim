import { AuthenticatedUser } from "@/types/autenticate-user";
import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data } = useSession();

  return {
    user: data?.user as AuthenticatedUser | undefined,
  };
};
