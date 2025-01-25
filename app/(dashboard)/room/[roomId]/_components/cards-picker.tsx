import { useBoard } from "@/context/board";
import { cn } from "@/lib/utils";

export const CardsPicker = () => {
  const { choiceOptions, handleChoice, selfChoice } = useBoard();

  const isSelfOption = (option: string) => selfChoice == option;

  return (
    <div className="flex flex-col items-center justify-center flex-wrap gap-6">
      <span className="text-gray-500 text-sm">Escolha uma carta: 👇</span>
      <div className="flex flex-wrap items-center justify-center gap-1 p-1 bg-gray-200 rounded-md">
        {choiceOptions.map((option) => (
          <button
            role="button"
            key={option.value}
            className={"[all:unset]"}
            onClick={() => handleChoice(option.value)}
          >
            <div
              className={cn(
                "cursor-pointer w-[48px] h-[54px] bg-gray-50 border border-gray-200 text-sm text-gray-600 flex items-center justify-center  hover:bg-gray-100 transition-colors rounded-md",
                {
                  "outline outline-gray-950 ": isSelfOption(option.value),
                },
              )}
            >
              {option.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
