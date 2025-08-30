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
        <div
          className="h-[300px] rounded-full animate-pulse opacity-80"
          style={{
            background:
              "linear-gradient(90deg, rgba(239, 68, 68, 0.5), rgba(245, 158, 11, 0.5), rgba(34, 197, 94, 0.5), rgba(59, 130, 246, 0.5), rgba(99, 102, 241, 0.5), rgba(168, 85, 247, 0.5), rgba(239, 68, 68, 0.5))",
            backgroundSize: "200% 100%",
            animation: "rainbow-flow 4s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
};
