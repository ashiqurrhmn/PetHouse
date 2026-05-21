"use client";

import React from "react";
import { motion } from "framer-motion";
const steps = [
  {
    number: "01",
    title: "Browse Pets",
    text: "Explore available cats and dogs and choose one that fits your lifestyle.",
  },
  {
    number: "02",
    title: "Submit Request",
    text: "Fill out a quick adoption form so we can understand your home environment.",
  },
  {
    number: "03",
    title: "Welcome Home",
    text: "Complete the process and bring your new furry family member home with joy.",
  },
];

const AdoptionJourney = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false }}
      className="mx-auto my-30 w-11/12 md:w-9/12"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#fb7563ea]">
          Adoption Journey
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#2e2804] dark:text-[#f8f4ea] md:text-4xl">
          Three Simple Steps To Adopt
        </h2>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <article
            className="relative rounded-lg border border-[#fb756326] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-[#fb75634d] dark:bg-[#1b1b1b]"
            key={step.number}
          >
            <p className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-[#fb7563ea] text-xl font-extrabold text-white">
              {step.number}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-[#2e2804] dark:text-[#f8f4ea]">{step.title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{step.text}</p>
          </article>
        ))}
      </div>
    </motion.section>
  );
};

export default AdoptionJourney;
