import React from "react";
import { FiActivity, FiCalendar, FiHeart } from "react-icons/fi";

const tips = [
  {
    icon: <FiHeart className="text-2xl text-[#fb7563ea]" />,
    title: "Balanced Daily Nutrition",
    text: "Choose age-appropriate food, keep fresh water nearby, and avoid overfeeding.",
  },
  {
    icon: <FiActivity className="text-2xl text-[#fb7563ea]" />,
    title: "Exercise And Play",
    text: "Keep pets active with regular walks, toys, and engagement to stay healthy and calm.",
  },
  {
    icon: <FiCalendar className="text-2xl text-[#fb7563ea]" />,
    title: "Routine Vet Checkups",
    text: "Schedule vaccinations and health checks regularly to prevent hidden issues early.",
  },
];

const PetCareTips = () => {
  return (
    <section className="mx-auto my-30 w-11/12 md:w-9/12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#fb7563ea]">
          Pet Care Tips
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#2e2804] dark:text-[#f8f4ea] md:text-4xl">
          Easy Habits For A Healthy Pet Life
        </h2>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {tips.map((tip) => (
          <article
            className="rounded-lg border border-[#fb756326] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-[#fb75634d] dark:bg-[#1b1b1b]"
            key={tip.title}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-[#fb75631a] dark:bg-[#fb756333]">
              {tip.icon}
            </div>
            <h3 className="mt-5 text-lg font-semibold text-[#2e2804] dark:text-[#f8f4ea]">{tip.title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{tip.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PetCareTips;
