"use client";

import { Button } from "@/components/ui/button";
import { SearchParams } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchInput } from "./search-input";

export function DashboardFilters() {
  const params = useSearchParams();
  const favorites = params?.get(SearchParams.FAVORITES);

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
              query: favorites
                ? undefined
                : {
                    [SearchParams.FAVORITES]: "true",
                  },
            }}
          >
            <Star
              className={cn(
                "h-4 w-4 ",
                favorites && "text-yellow-500 fill-yellow-500",
              )}
            />
            <span className="hidden sm:block sm:ml-2">Favoritos</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
