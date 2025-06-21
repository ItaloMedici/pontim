import { CardsPicker } from "@/components/cards-picker";
import { useBoard } from "@/context/board";

export const CardsPickerRoom = () => {
  const { choiceOptions, handleChoice, selfChoice } = useBoard();

  return (
    <CardsPicker
      choiceOptions={choiceOptions}
      handleChoice={handleChoice}
      selfChoice={selfChoice}
    />
  );
};
