"use client";

import { Input } from "@/components/ui/input";
import { SearchParams } from "@/lib/consts";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const params = useSearchParams();
  const searchParam = params?.get(SearchParams.SEARCH);

  const [value, setValue] = useState(searchParam ?? "");

  const handleSearch = (search: string) => {
    const url = new URL(window.location.href);

    if (!search.length) {
      url.searchParams.delete(SearchParams.SEARCH);
    } else {
      url.searchParams.set(SearchParams.SEARCH, search);
    }

    router.push(url.href);
  };

  const debouncedSearchRef = useRef(debounce(handleSearch, 250));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setValue(search);

    debouncedSearchRef.current(search);
  };

  return (
    <div className="relative">
      <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground" />
      <Input
        className="w-full max-w-lg pl-9"
        placeholder="Pesquisar"
        type="search"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}
