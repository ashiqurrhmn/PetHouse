import AdoptionForm from "@/components/AdoptionForm";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeDollarSign,
  CalendarDays,
  HeartPulse,
  MapPin,
  PawPrint,
  ShieldCheck,
  Sparkles,
  UserRound,
  VenusAndMars,
} from "lucide-react";
import React from "react";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

const DetailCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl border border-[#fb756326] bg-[#efe8d470] p-3 shadow-sm dark:border-[#fb75634d] dark:bg-[#1f1b19]">
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#fb756314] text-[#fb7563ea] dark:bg-[#fb756326]">
        <Icon size={16} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#7b6f68] dark:text-gray-400">
          {label}
        </p>
        <p className="mt-1 text-sm font-extrabold text-[#2e2804] dark:text-[#f8f4ea]">
          {value || "Not specified"}
        </p>
      </div>
    </div>
  </div>
);

const PetDetailsPage = async ({ params }) => {
  const { id } = await params;
  const {token} = await auth.api.getToken({
    headers: await headers()
  })
  console.log(token);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  const pet = await res.json();

  const details = [
    { icon: PawPrint, label: "Species", value: pet.species },
    { icon: Sparkles, label: "Breed", value: pet.breed },
    { icon: CalendarDays, label: "Age", value: pet.age },
    { icon: VenusAndMars, label: "Gender", value: pet.gender },
    { icon: MapPin, label: "Location", value: pet.location },
    {
      icon: BadgeDollarSign,
      label: "Adoption Fee",
      value: pet.adoptionFee ? `$${pet.adoptionFee}` : "Free",
    },
    { icon: HeartPulse, label: "Health Status", value: pet.healthStatus },
    {
      icon: ShieldCheck,
      label: "Vaccinated",
      value: pet.vaccinated ? "Yes" : "No",
    },
  ];

  return (
    <section className="min-h-screen bg-white pb-20 pt-10 text-[#2e2804] transition-colors duration-300 dark:bg-[#111111] dark:text-[#f8f4ea]">
      <div className="mx-auto w-11/12 max-w-5xl">
        <Link
          href="/all-pets"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#2e2804] transition hover:text-[#fb7563ea] dark:text-[#f8f4ea]"
        >
          <ArrowLeft size={17} />
          Back to All Pets
        </Link>

        <div className="grid min-w-0 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <div className="relative h-60 overflow-hidden rounded-3xl border border-[#fb756326] bg-[#efe8d470] shadow-sm dark:border-[#fb75634d] dark:bg-[#1c1c1c] sm:h-77.5 lg:h-87.5">
              <Image
                src={pet.image}
                alt={`${pet.name} the ${pet.breed}`}
                fill
                unoptimized
                priority
                sizes="(min-width: 1280px) 48vw, (min-width: 768px) 75vw, 92vw"
                className="object-cover"
              />
              <span className="absolute right-4 top-4 rounded-full bg-[#20b97b] px-3 py-1.5 text-xs font-extrabold text-white shadow-sm">
                Available
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-black text-[#2e2804] dark:text-[#f8f4ea] md:text-4xl">
                  {pet.name}
                </h1>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[pet.species, pet.breed, pet.gender].filter(Boolean).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#fb756340] bg-[#fb756314] px-3 py-1 text-xs font-bold text-[#fb7563ea] dark:bg-[#fb75631f]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[#efe8d470] px-4 py-3 text-left dark:bg-[#1c1c1c] sm:text-right">
                <p className="text-xs font-semibold text-[#7b6f68] dark:text-gray-400">
                  Adoption Fee
                </p>
                <p className="text-2xl font-black text-[#fb7563ea]">
                  {pet.adoptionFee !== undefined ? `$${pet.adoptionFee}` : "Free"}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {details.map((item) => (
                <DetailCard
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>

            <div className="mt-7">
              <div className="flex items-center gap-2">
                <UserRound size={20} className="text-[#fb7563ea]" />
                <h2 className="text-xl font-black text-[#2e2804] dark:text-[#f8f4ea]">
                  About {pet.name}
                </h2>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4d463f] dark:text-gray-300">
                {pet.description || `${pet.name} is waiting for a loving home.`}
              </p>
            </div>
          </div>

          <AdoptionForm petName={pet.name} />
        </div>
      </div>
    </section>
  );
};

export default PetDetailsPage;
