import PetFilter from "@/components/PetFilter";
import PetsCard from "@/components/PetsCard";
import PetSearch from "@/components/PetSearch";
import { SlidersHorizontal } from "lucide-react";
import React from "react";
import { FiSearch } from "react-icons/fi";
import PetCardMotion from "@/components/PetCardMotion";


const fetchPets = async (searchTerm = "", species = "") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets?search=${searchTerm}&species=${species}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data || [];
};

const AllPets = async ({searchParams}) => {
  //  console.log(searchParams);
  const sParams = await searchParams;
  const pets = await fetchPets(sParams?.searchTerm || "", sParams?.species || "");
 
  return (
    <section className="min-h-screen bg-white pb-24 pt-20 text-[#2e2804] transition-colors duration-300 dark:bg-[#111111] dark:text-[#f8f4ea]">
      <div className="mx-auto w-11/12 md:w-9/12 mb-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#fb7563ea]">
            Find A Companion
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-[#2e2804] dark:text-[#f8f4ea] md:text-5xl">
            Pets Ready For A Loving Home
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#2e2804] dark:text-gray-300">
            Browse available cats, dogs etc for adoption. Find your new best
            friend today!
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-[#fb756326] bg-[#efe8d470] p-4 shadow-sm dark:border-[#fb75634d] dark:bg-[#1a1a1a] md:p-5">
          <div className="flex gap-2 font-semibold mb-5">
            <span className="text-[#fb7563ea]">
              <SlidersHorizontal />
            </span>{" "}
            Search & Filter
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.8fr_auto]">
            <label className="relative block">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#fb7563ea]" />
              <PetSearch />
            </label>

            <PetFilter />

          </div>
        </div>
      </div>
      <div className="mx-auto w-11/12 md:w-9/12">
  {pets.length === 0 ? (
    <div className="flex min-h-75 flex-col items-center justify-center rounded-2xl border border-dashed border-[#fb75634d] bg-[#efe8d470] text-center dark:bg-[#1a1a1a]">
      <h2 className="text-2xl font-bold text-[#2e2804] dark:text-white">
        No Pets Found
      </h2>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        No pets match your search or filter.
      </p>
    </div>
  ) : (
    <PetCardMotion pets={pets} />
  )}
</div>
    </section>
  );
};

export default AllPets;
