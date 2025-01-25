import { Button } from "@/components/ui/button";
import { useBoard } from "@/context/board";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { Eraser, EyeIcon, EyeOffIcon, RotateCcw } from "lucide-react";

const ICON_SIZE = 16;

export const BoardDock = () => {
  const {
    others,
    handleRevealCards,
    reveal,
    handleReset,
    average,
    agreementPercentage,
  } = useBoard();
  const isMobile = useIsMobile();

  if (!others.length) {
    return null;
  }

  const onResetClick = () => {
    if (reveal) {
      handleRevealCards();
    }

    handleReset();
  };

  const agreementIcon = () => {
    if (agreementPercentage === 95) {
      return "🤩";
    }

    if (agreementPercentage >= 75) {
      return "😍";
    }

    if (agreementPercentage >= 50) {
      return "🤔";
    }

    if (agreementPercentage >= 25) {
      return "😐";
    }

    return "🤨";
  };

  const ResultDesktop = () => {
    if (!reveal || isMobile) return null;

    return (
      <div className="flex items-center gap-2 bg-white p-1 rounded-md border border-gray-200 font-medium">
        <span className="text-md mr-2">{agreementIcon()}</span>
        <span className="text-xs text-gray-500">Média:</span>
        <span className="text-sm text-gray-800">{average}</span>
        <span className="text-xs text-gray-500">Concordância:</span>
        <span className="text-sm text-gray-800">{agreementPercentage}%</span>
      </div>
    );
  };

  const ResultMobile = () => {
    if (!reveal || !isMobile) return null;

    return (
      <div className="flex items-center w-fit gap-2 bg-white p-2 rounded-lg border border-gray-200">
        <span className="text-md mr-2">{agreementIcon()}</span>
        <span className="text-sm text-gray-500">Média:</span>
        <span className="text-sm text-gray-800">{average}</span>
        <span className="text-sm text-gray-500">Concordância:</span>
        <span className="text-sm text-gray-800">{agreementPercentage}%</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="border bg-gray-50 border-gray-200 p-[6px] rounded-lg flex items-center justify-between gap-[6px]">
        <Button onClick={handleRevealCards} size={"sm"} variant={"outline"}>
          {reveal ? (
            <EyeOffIcon size={ICON_SIZE} />
          ) : (
            <EyeIcon size={ICON_SIZE} />
          )}{" "}
          {reveal ? "Esconder" : "Revelar"}
        </Button>

        <Button onClick={onResetClick} size={"sm"} variant={"outline"}>
          <RotateCcw size={ICON_SIZE} /> Reiniciar
        </Button>

        <Button variant={"ghost"} onClick={handleReset} size={"sm"}>
          <Eraser size={ICON_SIZE} /> Limpar
        </Button>

        <ResultDesktop />
      </div>
      <ResultMobile />
    </div>
  );
};
