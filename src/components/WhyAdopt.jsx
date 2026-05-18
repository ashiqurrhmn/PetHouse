import Image from "next/image";
import React from "react";
import { FaHeart, FaHome, FaPaw } from "react-icons/fa";

const reasons = [
  {
    icon: <FaHeart className="text-2xl text-[#fb7563ea]" />,
    title: "Save A Precious Life",
    description:
      "By adopting, you give rescued pets a second chance at a safe and happy life.",
  },
  {
    icon: <FaHome className="text-2xl text-[#fb7563ea]" />,
    title: "Complete Your Family",
    description:
      "Pets bring love, fun, and daily companionship that make every home feel warmer.",
  },
  {
    icon: <FaPaw className="text-2xl text-[#fb7563ea]" />,
    title: "Fight Pet Homelessness",
    description:
      "Every adoption supports shelters and helps reduce the number of homeless animals.",
  },
];

const WhyAdopt = () => {
  return (
    <section className="mx-auto my-30 w-11/12 md:w-9/12">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#fb7563ea]">
          Why Adopt Pets
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#2e2804] dark:text-[#f8f4ea] md:text-4xl">
          A Small Adoption Choice, A Big Life Change
        </h2>
        <p className="mt-4 text-[#2e2804c4] dark:text-[#e5dfd2cc]">
          Adoption creates a meaningful bond and gives a deserving companion the loving home they
          always needed.
        </p>
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="mt-8 space-y-4">
            {reasons.map((reason) => (
              <div
                className="flex gap-4 rounded-lg border border-[#fb75632a] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-[#fb75634d] dark:bg-[#1b1b1b]"
                key={reason.title}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fb75631a]">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#2e2804] dark:text-[#f8f4ea]">{reason.title}</h3>
                  <p className="mt-1 text-sm text-[#2e2804c4] dark:text-[#e5dfd2cc]">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative order-1 mx-auto mt-10 w-full max-w-lg lg:order-2">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-lg bg-[#efe8d470] dark:bg-[#2e2a20]" />
          <Image
            src="/assets/cat1.jpg"
            alt="Cute adopted cat"
            width={640}
            height={500}
            className="relative h-120 w-full rounded-lg object-cover object-center shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;
