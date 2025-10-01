"server only";

import { authOptions } from "@/authOptions";
import { getGuestSession, getGuestToken } from "@/lib/auth/guest-auth";
import { CombinedSession } from "@/types/guest-auth";
import { getServerSession } from "next-auth";

export async function getCombinedSession(): Promise<CombinedSession | null> {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return session;
  }

  const guestToken = getGuestToken();

  if (!guestToken) return null;

  const guestSession = await getGuestSession(guestToken);

  return guestSession;
}

export function isGuestSession(session: CombinedSession | null): boolean {
  return session?.user?.isGuest === true;
}
