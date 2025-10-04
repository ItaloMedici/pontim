"use client";

import { CombinedSession } from "@/types/guest-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useContext } from "react";

const CombinedSessionContext = createContext<CombinedSession | null>(null);

export const CombinedSessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: CombinedSession | null;
}) => {
  return (
    <CombinedSessionContext.Provider value={session}>
      <SessionProvider>{children}</SessionProvider>
    </CombinedSessionContext.Provider>
  );
};

export const useCombinedSession = () => {
  const context = useContext(CombinedSessionContext);
  const { data: session } = useSession();
  return context || (session as CombinedSession | null);
};
