"use client";

import { useSession } from "next-auth/react";

export const useCombinedSession = async () => {
  const session = useSession();

  return session;
};
