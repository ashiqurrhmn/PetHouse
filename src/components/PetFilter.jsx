"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaDog } from "react-icons/fa";

const PetFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilter = (e) => {
    const value = e.target.value;

    const params = new URLSearchParams(searchParams);

    if (value === "All Pets") {
      params.delete("species");
    } else {
      params.set("species", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <label className="relative block">
      <select
        defaultValue={searchParams.get("species") || "All Pets"}
        onChange={handleFilter}
        className="h-12 w-full appearance-none rounded-lg border border-[#dfe6ef] bg-white px-4 text-sm font-semibold text-[#031a3d] outline-none transition focus:border-[#fb7563ea] dark:border-[#374151] dark:bg-[#202020] dark:text-[#f8f4ea]"
      >
        <option>All Pets</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Bird">Bird</option>
        <option value="Fish">Fish</option>
        <option value="Rabbit">Rabbit</option>
        <option value="Other">Other</option>
      </select>

      <FaDog className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#fb7563ea]" />
    </label>
  );
};

export default PetFilter;