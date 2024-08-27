import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const numericCardVariants = cva(
  "relative flex items-center justify-center rounded-lg border font-medium font-md",
  {
    variants: {
      color: {
        primary: "text-sky-700 border-sky-500",
        gray: "text-gray-500 border-gray-200",
      },
      bgColor: {
        primary: "bg-sky-500 border-sky-500",
        white: "bg-white",
        gray: "bg-gray-200 border-gray-200",
      },
      size: {
        default: "w-12 h-16",
        small: "w-8 h-12",
        large: "w-16 h-20",
      },
      selected: {
        true: "ring-2 ring-sky-500 shadow-md",
        flase: "",
      },
    },
    defaultVariants: {
      color: "gray",
      size: "default",
      bgColor: "white",
    },
  },
);

type NumericCardProps = VariantProps<typeof numericCardVariants> & {
  colorOnHover?: boolean;
  value: number | string | undefined | null;
  label?: string;
};

export const NumericCard = ({
  value,
  color,
  size,
  selected,
  bgColor,
  label,
}: NumericCardProps) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className={cn(numericCardVariants({ color, size, selected, bgColor }))}
      >
        <div>{value}</div>
      </div>
      {label ? (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      ) : null}
    </div>
  );
};
