"use client";

import { CreateInstantRoomDialog } from "@/components/create-instant-room/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCombinedSession } from "@/context/session";
import { cn } from "@/lib/utils";
import { ChoiceSelectOptions } from "@/types/choice-options";
import { ArrowUpRight, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { createContext, useContext, useMemo } from "react";

type TemporaryRoomContextType = {
  decks: ChoiceSelectOptions[];
  button: React.ReactNode;
  currentRoomId?: string | null;
};

export const TemporaryRoomContext = createContext<TemporaryRoomContextType>({
  decks: [],
  button: null,
});

type TemporaryRoomProviderProps = {
  children: React.ReactNode;
  decks: ChoiceSelectOptions[];
  currentRoomId: string | null;
};

export const TemporaryRoomProvider = ({
  children,
  decks,
  currentRoomId,
}: TemporaryRoomProviderProps) => {
  const session = useCombinedSession();

  const contextValue = useMemo(() => {
    const baseContext = {
      decks,
      currentRoomId,
    };

    if (session?.user && !session.user.isGuest) {
      return { ...baseContext, button: null };
    }

    if (currentRoomId) {
      return { ...baseContext, button: <JoinCurrentRoomButton /> };
    }

    return { ...baseContext, button: <CreateRoomDialog /> };
  }, [decks, currentRoomId, session]);

  return (
    <TemporaryRoomContext.Provider value={contextValue}>
      {children}
    </TemporaryRoomContext.Provider>
  );
};

export const useTemporaryRoomContext = () => {
  return useContext(TemporaryRoomContext);
};

const CreateRoomDialog = () => {
  const t = useTranslations("marketing.homepage.hero");

  return (
    <CreateInstantRoomDialog>
      <Button size="lg" variant="outline">
        <Zap className="w-4 h-4" />
        {t("createInstantRoom")}
      </Button>
    </CreateInstantRoomDialog>
  );
};

const JoinCurrentRoomButton = () => {
  const t = useTranslations("marketing.homepage.hero");
  const { currentRoomId } = useTemporaryRoomContext();

  if (!currentRoomId) return null;

  return (
    <Link
      className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
      href={`/room/${currentRoomId}`}
    >
      {t("joinCurrentRoom")}
      <ArrowUpRight className="w-4 h-4" />
    </Link>
  );
};
