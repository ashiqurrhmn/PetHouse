"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const PetSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("searchTerm") || ""
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (search) {
        params.set("searchTerm", search);
      } else {
        params.delete("searchTerm");
      }

      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, router, pathname, searchParams]);

  return (
    <label className="relative block">
      <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#fb7563ea]" />

      <input
        type="search"
        placeholder="Search by name or breed"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-12 w-full rounded-lg border border-[#dfe6ef] bg-white pl-11 pr-4 text-sm font-medium text-[#031a3d] outline-none transition placeholder:text-[#7b8798] focus:border-[#fb7563ea] dark:border-[#374151] dark:bg-[#202020] dark:text-[#f8f4ea] dark:placeholder:text-gray-400"
      />
    </label>
  );
};

export default PetSearch;