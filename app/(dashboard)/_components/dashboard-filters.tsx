import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";

export function DashboardFilters() {
  return (
    <div className="flex items-center justify-end sm:justify-between gap-4">
      <h2 className="font-semibold text-2xl hidden sm:block">Salas</h2>
      <div className="inline-flex gap-4">
        <SearchInput />
        <Button
          asChild
          size="lg"
          variant={"outline"}
          className="font-normal justify-start px-4 h-10"
        >
          <Link
            href={{
              pathname: "/",
              query: {
                favorites: "true",
              },
            }}
          >
            <Star className="h-4 w-4 " />
            <span className="hidden sm:block sm:ml-2">Favoritos</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
