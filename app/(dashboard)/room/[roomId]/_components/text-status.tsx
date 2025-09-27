"use client";

import { useBoard } from "@/context/board";
import { useTranslations } from "next-intl";

export const TextStatus = () => {
  const t = useTranslations();
  const { reveal, totalChoices, totalPlayers, average } = useBoard();

  let text = t("dashboard.room.status.votesCount", {
    totalChoices,
    totalPlayers,
  });

  if (totalChoices === 0) {
    text = t("dashboard.room.status.noVotes");
  }

  if (totalChoices === totalPlayers) {
    text = t("dashboard.room.status.allVoted");
  }

  if (reveal) {
    text = t("dashboard.room.status.averageResult", { average });
  }

  if (totalPlayers === 1) {
    text = t("dashboard.room.status.alone");
  }

  return <span className="text-sm text-gray-500">{text}</span>;
};
