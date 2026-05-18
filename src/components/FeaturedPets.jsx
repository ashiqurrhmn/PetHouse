import React from "react";
import PetsCard from "./PetsCard";
import Link from "next/link";
import { Cat } from "lucide-react";

const FeaturedPets = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/featured?featured=true`,
  );
  const data = await res.json();

  return (
    <div className="w-9/12 mx-auto mt-30 bg-[#efe8d470] dark:bg-[#1c1c1c] p-10 rounded-2xl">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#fb7563ea]">
          Featured Pets
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#2e2804] dark:text-[#f8f4ea] md:text-4xl">
          Meet The Pets Ready To Join Your Family
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {data.map((pet) => (
          <PetsCard key={pet._id} pet={pet} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link
          href="/all-pets"
          className="inline-flex gap-2 h-12 items-center justify-center rounded-full bg-[#fb7563ea] px-8 text-sm font-bold text-white shadow-sm transition hover:bg-[#f95f49]"
        >
          View All{" "}
          <span>
            <Cat size={18} strokeWidth={2} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPets;
