"use client";

import { ChoiceSelectOptions } from "@/types/choice-options";
import { createContext, useContext } from "react";

const DeckSelectionOptions = createContext<ChoiceSelectOptions[]>([]);

export const DeckOptionsProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ChoiceSelectOptions[];
}) => {
  return (
    <DeckSelectionOptions.Provider value={value}>
      {children}
    </DeckSelectionOptions.Provider>
  );
};

export const useDeckOptions = () => {
  return useContext(DeckSelectionOptions);
};
