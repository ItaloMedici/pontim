export const Glow = ({
  variant = "bottom",
  className = "",
}: {
  variant?: "top" | "bottom";
  className?: string;
}) => {
  return (
    <div
      className={`absolute ${
        variant === "top" ? "top-0" : "bottom-0"
      } -z-10 h-[300px] w-full ${className}`}
    >
      <div className="mx-auto max-w-4xl blur-[100px]">
        <div className="h-[300px] animate-pulse rounded-full bg-gradient-to-r from-primary/50 to-primary/30" />
      </div>
    </div>
  );
};
