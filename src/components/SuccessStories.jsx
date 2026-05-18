import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

const stories = [
  {
    image: "/assets/dog1.jpg",
    name: "Rocky & Rahim",
    rating: 5,
    text: "Rocky was shy in the shelter, but now he greets every morning with joyful tail wags.",
  },
  {
    image: "/assets/cat2.jpg",
    name: "Mimi & Saba",
    rating: 5,
    text: "Mimi turned Saba's quiet apartment into a playful and comforting little world.",
  },
  {
    image: "/assets/dog2.jpg",
    name: "Bruno & Tania",
    rating: 4,
    text: "Bruno found his forever family and quickly became the neighborhood's happiest dog.",
  },
];

const SuccessStories = () => {
  return (
    <section className="bg-[#efe8d470] py-30 transition-colors duration-300 dark:bg-[#171717]">
      <div className="mx-auto w-11/12 md:w-9/12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#fb7563ea]">
            Success Stories
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2e2804] dark:text-[#f8f4ea] md:text-4xl">
            Happy Endings From PetHouse Families
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-[#fb756320] transition hover:-translate-y-1 hover:shadow-md dark:bg-[#1e1e1e] dark:ring-[#fb75634d]"
              key={story.name}
            >
              <div className="relative aspect-2/2 w-full overflow-hidden bg-[#ffe7df] dark:bg-[#2b2523]">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  sizes="(min-width: 200px) 25vw, (min-width: 768px) 40vw, 90vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[#2e2804] dark:text-[#f8f4ea]">{story.name}</h3>
                  <div className="flex text-sm text-[#ffbb00ea]" aria-label={`${story.rating} stars`}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        className={index < story.rating ? "opacity-100" : "opacity-25"}
                        key={`${story.name}-${index}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm italic text-gray-600 dark:text-gray-300">{story.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
