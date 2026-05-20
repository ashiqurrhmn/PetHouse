"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import ListingDeleteButton from "@/components/listings/ListingDeleteButton";
import ListingEditButton from "@/components/listings/ListingEditButton";
import ListingRequestsButton from "@/components/listings/ListingRequestsButton";
import ListingViewButton from "@/components/listings/ListingViewButton";

const normalizeStatus = (status) => (status || "Available").toLowerCase();

const ListingCard = ({ pet, onPetDeleted, onPetUpdated }) => {
  const isAdopted = normalizeStatus(pet.status) === "adopted";

  return (
    <article className="overflow-hidden rounded-3xl border border-[#fb756326] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-[#fb75634d] dark:bg-[#161616]">
      <div className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="relative h-64 overflow-hidden md:h-full">
          <Image
            src={pet.image}
            alt={`${pet.name} listing image`}
            fill
            unoptimized
            sizes="(min-width: 1280px) 220px, 100vw"
            className="object-cover"
          />
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-black text-white ${
              isAdopted ? "bg-[#fb7563ea]" : "bg-[#20b97b]"
            }`}
          >
            {isAdopted ? "Adopted" : "Available"}
          </span>
        </div>

        <div className="flex min-w-0 flex-col p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="truncate text-2xl font-black text-[#2e2804] dark:text-[#f8f4ea]">
                {pet.name}
              </h2>
              <p className="mt-1 text-sm font-semibold text-[#665f59] dark:text-gray-300">
                {pet.breed} <span className="text-[#fb7563ea] mx-2">•</span> {pet.age} <span className="text-[#fb7563ea] mx-2">•</span> {pet.gender}
              </p>
            </div>
            <p className="shrink-0 rounded-full bg-[#fb756314] px-3 py-1 text-sm font-black text-[#fb7563ea]">
              ${pet.adoptionFee || 0}
            </p>
          </div>

          <div className="mt-4 grid gap-2 rounded-2xl bg-[#efe8d470] p-4 text-sm dark:bg-[#262220]">
            <p className="flex items-center gap-2 text-[#3f434d] dark:text-[#e5e7eb]">
              <MapPin size={16} className="text-[#fb7563ea]" />
              {pet.location}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <ListingRequestsButton pet={pet} />
            <ListingEditButton pet={pet} onPetUpdated={onPetUpdated} />
            <ListingViewButton petId={pet._id} />
            <ListingDeleteButton pet={pet} onPetDeleted={onPetDeleted} />
          </div>
        </div>
      </div>
    </article>
  );
};

export { normalizeStatus };
export default ListingCard;
