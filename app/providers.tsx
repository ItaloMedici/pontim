"use client";

import { Toaster } from "@/components/ui/sonner";
import { CombinedSessionProvider } from "@/context/session";
import { CombinedSession } from "@/types/guest-auth";

export function Providers({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: CombinedSession | null }>) {
  return (
    <CombinedSessionProvider session={session}>
      <Toaster />
      {children}
    </CombinedSessionProvider>
  );
}
