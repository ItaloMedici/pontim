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
        <span className="text-muted-foreground text-sm">{t("title")}</span>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-1 p-1 bg-muted/70 dark:bg-muted/30 rounded-md">
        {choiceOptions.map((option) => (
          <button
            role="button"
            key={option.value}
            className={"[all:unset]"}
            onClick={(event) => handleChoiceClick(event, option.value)}
          >
            <div
              className={cn(
                "cursor-pointer w-[48px] h-[54px] bg-card border border-border text-sm text-foreground flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors rounded-md font-medium",
                {
                  "outline outline-foreground outline-2": isSelfOption(
                    option.value,
                  ),
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
