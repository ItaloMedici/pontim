import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
    </div>
  );
}
