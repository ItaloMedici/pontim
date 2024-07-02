import { NumericCard } from "@/components/card/numeric-card";
import { useBoard } from "@/context/board";
import { cn } from "@/lib/utils";

export const CardsPicker = () => {
  const { choiceOptions, handleChoice, self } = useBoard();

  const isSelfOption = (option: string) => self.choice === option;

  return (
    <div className="flex flex-col items-center justify-center flex-wrap gap-4">
      <span className="text-gray-500 text-sm">Escolha uma carta: 👇</span>
      <div className="flex flex-wrap gap-2">
        {choiceOptions.map((option) => (
          <div
            role="presentation"
            key={option.value}
            className={cn(
              "cursor-pointer hover:translate-x-2 transition-transform",
              { "translate-x-2": isSelfOption(option.value) }
            )}
            onClick={() => handleChoice(option.value)}
          >
            <NumericCard
              value={option.label}
              color={isSelfOption(option.value) ? "sky-500" : "sky-300"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
