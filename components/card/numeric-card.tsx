import { cn } from "@/lib/utils";

type NumericCardProps = {
  value: string | number | null;
  color: string;
  colorOnHover?: boolean;
};

export const NumericCard = ({
  value,
  color,
  colorOnHover,
}: NumericCardProps) => {
  return (
    <div
      className={cn(
        `relative flex items-center justify-center w-full h-full rounded-lg border-gray-300`,
        {
          [`bg-${color}/30 text-${color}`]: !colorOnHover,
          [`bg-gray-100 text-gray-600 hover:bg-${color}/30 hover:text-${color}`]:
            colorOnHover,
        }
      )}
    >
      <div className="absolute top-0 left-0 text-xs flex items-center w-3 aspect-square bg-white rounded-full">
        <span className="opacity-50">{value}</span>
      </div>
      <div>{value}</div>
      <div className="absolute bottom-0 right-0 text-xs flex items-center w-3 aspect-square bg-white rounded-full">
        <span className="opacity-50">{value}</span>
      </div>
    </div>
  );
};
