"use client";

import { Toaster } from "@/components/ui/sonner";
import { CombinedSessionProvider } from "@/context/session";
import { ThemeProvider } from "@/context/theme";
import { CombinedSession } from "@/types/guest-auth";

export function Providers({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: CombinedSession | null }>) {
  return (
    <ThemeProvider>
      <CombinedSessionProvider session={session}>
        <Toaster />
        {children}
      </CombinedSessionProvider>
    </ThemeProvider>
  );
}
