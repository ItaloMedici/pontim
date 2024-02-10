import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchInput() {
  return (
    <div className="relative">
      <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground" />
      <Input
        className="w-full max-w-lg pl-9"
        placeholder="Pesquisar"
        type="search"
      />
    </div>
  );
}
