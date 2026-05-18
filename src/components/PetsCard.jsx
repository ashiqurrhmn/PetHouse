import Image from "next/image";
import React from "react";
import { Heart, MapPin, PawPrint, ShieldCheck, Syringe, Wallet } from "lucide-react";
import Link from "next/link";

const PetsCard = ({ pet }) => {
  const isVaccinated = Boolean(pet?.vaccinated);

  return (
    <article className="group mb-7 overflow-hidden rounded-3xl border border-[#fb756326] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#fb75634d] dark:bg-[#1c1c1c]">
      <div className="relative h-80 w-full overflow-hidden">
        <Image
          src={pet.image}
          alt={`${pet.name} the ${pet.breed}`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover  transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#2e2804]">
          {pet.species}
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-[#20b97b] px-3 py-1 text-xs font-bold text-white">
          Available
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-extrabold text-[#2e2804] dark:text-[#f8f4ea]">
              {pet.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-[#5f6472] dark:text-gray-300">
              {pet.breed} - {pet.age} - {pet.gender}
            </p>
          </div>
          <button
            type="button"
            aria-label={`Save ${pet.name}`}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#fb756340] text-[#fb7563ea] transition hover:bg-[#fb756314]"
          >
            <Heart size={18} />
          </button>
        </div>

        <div className="grid gap-3 rounded-2xl bg-[#efe8d470] p-4 text-sm dark:bg-[#262220]">
          <p className="flex items-center gap-2 text-[#3f434d] dark:text-[#e5e7eb]">
            <MapPin size={16} className="text-[#fb7563ea]" />
            {pet.location}
          </p>
          <p className="flex items-center gap-2 font-semibold text-[#2e2804] dark:text-[#f8f4ea]">
            <Wallet size={16} className="text-[#fb7563ea]" />${pet.adoptionFee}{" "}
            adoption fee
          </p>
        
        </div>


        <div className="grid grid-cols-2 gap-3 border-t border-[#ece4df] pt-4 dark:border-[#35302d]">
          <Link href={`/all-pets/${pet._id}`} className="h-11 text-center flex justify-center items-center rounded-full border border-[#d6cbc6] bg-white text-sm font-semibold text-[#2e2804] transition hover:border-[#fb756380]  dark:border-[#4b5563] dark:bg-transparent dark:text-[#f8f4ea]">
        
            View Details
          </Link>
          <button
            type="button"
            className="h-11 flex items-center justify-center gap-2 rounded-full bg-[#fb7563ea]  text-sm font-bold text-white shadow-sm transition hover:bg-[#ff6c52]"
          >
            Adopt Now <span className=""><PawPrint size={18} strokeWidth={2} /></span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default PetsCard;
