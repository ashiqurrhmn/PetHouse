
import PetsCard from "@/components/PetsCard";
import { SlidersHorizontal } from "lucide-react";
import React from "react";
import { FaCat, FaDog } from "react-icons/fa";
import { FiFilter, FiSearch } from "react-icons/fi";

const fetchPets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data || [];
};

const AllPets = async () => {
  const pets = await fetchPets();
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
            Browse available cats, dogs etc for adoption. Find your new best friend today!
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-[#fb756326] bg-[#efe8d470] p-4 shadow-sm dark:border-[#fb75634d] dark:bg-[#1a1a1a] md:p-5">
            <div className="flex gap-2 font-semibold mb-5">
                <span className="text-[#fb7563ea]"><SlidersHorizontal /></span> Search & Filter
            </div>
          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.8fr_0.7fr_auto]">
            <label className="relative block">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#fb7563ea]" />
              <input
                type="search"
                placeholder="Search by name or breed"
                className="h-12 w-full rounded-lg border border-[#dfe6ef] bg-white pl-11 pr-4 text-sm font-medium text-[#031a3d] outline-none transition placeholder:text-[#7b8798] focus:border-[#fb7563ea] dark:border-[#374151] dark:bg-[#202020] dark:text-[#f8f4ea] dark:placeholder:text-gray-400"
              />
            </label>

            <label className="relative block">
              <select className="h-12 w-full appearance-none rounded-lg border border-[#dfe6ef] bg-white px-4 text-sm font-semibold text-[#031a3d] outline-none transition focus:border-[#fb7563ea] dark:border-[#374151] dark:bg-[#202020] dark:text-[#f8f4ea]">
                <option>All Pets</option>
                <option>Dogs</option>
                <option>Cats</option>
              </select>
              <FaDog className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#fb7563ea]" />
            </label>


            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#fb7563ea] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#f95f49]">
              <FiFilter />
              Filter
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto w-11/12 md:w-9/12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {
            pets.map((pet) => (
                <PetsCard key={pet._id} pet={pet} />
            ))
        }
      </div>
    </section>
  );
};

export default AllPets;
