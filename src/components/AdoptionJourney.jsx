import React from "react";

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
    <section className="mx-auto w-11/12 my-30 md:w-9/12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#fb7563ea]">
          Adoption Journey
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#2e2804]  md:text-4xl">
          Three Simple Steps To Adopt
        </h2>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <article
            className="relative rounded-lg border border-[#fb756326] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            key={step.number}
          >
            <p className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-[#fb7563ea] text-xl font-extrabold text-white">
              {step.number}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-[#2e2804]">{step.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AdoptionJourney;
