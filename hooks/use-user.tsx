import { useCombinedSession } from "@/context/session";
import { AuthenticatedUser } from "@/types/autenticate-user";

export const useUser = () => {
  const session = useCombinedSession();

  return {
    user: session?.user as AuthenticatedUser | undefined,
  };
};
