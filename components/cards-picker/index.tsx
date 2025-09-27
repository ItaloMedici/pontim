import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type CardsPickerProps = {
  choiceOptions: { value: string }[];
  handleChoice: (choice: string) => void;
  selfChoice?: string | null;
  showTitle?: boolean;
};

export const CardsPicker = ({
  choiceOptions,
  handleChoice,
  selfChoice,
  showTitle = true,
}: CardsPickerProps) => {
  const t = useTranslations("dashboard.room.cardsPicker");
  const isSelfOption = (option: string) => selfChoice == option;

  const handleChoiceClick = (event: React.MouseEvent, option: string) => {
    event.preventDefault();

    handleChoice(option);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-wrap gap-6">
      {showTitle ? (
        <span className="text-gray-500 text-sm">{t("title")}</span>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-1 p-1 bg-gray-200 rounded-md">
        {choiceOptions.map((option) => (
          <button
            role="button"
            key={option.value}
            className={"[all:unset]"}
            onClick={(event) => handleChoiceClick(event, option.value)}
          >
            <div
              className={cn(
                "cursor-pointer w-[48px] h-[54px] bg-gray-50 border border-gray-200 text-sm text-gray-600 flex items-center justify-center  hover:bg-gray-100 transition-colors rounded-md",
                {
                  "outline outline-gray-950 ": isSelfOption(option.value),
                },
              )}
            >
              {option.value}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
