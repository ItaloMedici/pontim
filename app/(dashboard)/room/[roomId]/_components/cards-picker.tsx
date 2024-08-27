import { NumericCard } from "@/components/card/numeric-card";
import { useBoard } from "@/context/board";
import { cn } from "@/lib/utils";

export const CardsPicker = () => {
  const { choiceOptions, handleChoice, selfChoice } = useBoard();

  const isSelfOption = (option: string) => selfChoice == option;

  return (
    <div className="flex flex-col items-center justify-center flex-wrap gap-6">
      <span className="text-gray-500 text-sm">Escolha uma carta: 👇</span>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {choiceOptions.map((option) => (
          <div
            role="presentation"
            key={option.value}
            className={cn(
              "cursor-pointer hover:-translate-y-2 transition-transform",
              { "-translate-y-2": isSelfOption(option.value) },
            )}
            onClick={() => handleChoice(option.value)}
          >
            <NumericCard
              value={option.label}
              size={"large"}
              color={isSelfOption(option.value) ? "primary" : "gray"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
