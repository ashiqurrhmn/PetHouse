import Image from "next/image";
import React from "react";

const pets = [
  { image: "/assets/cat3.jpg", name: "Luna", type: "Playful Kitten", age: "1 months" },
  { image: "/assets/dog3.jpg", name: "Max", type: "Friendly Puppy", age: "1 year" },
  { image: "/assets/cat4.jpg", name: "Milo", type: "Calm Companion", age: "2 months" },
];

const MeetPets = () => {
  return (
    <section className="bg-[#efe8d470] py-30">
      <div className="mx-auto w-11/12 md:w-9/12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#fb7563ea]">
            Meet Our Lovely Pets
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2e2804] md:text-4xl">
            Cute Faces Waiting For A Forever Home
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pets.map((pet) => (
            <article
              className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-[#fb756320] transition hover:-translate-y-1 hover:shadow-md"
              key={pet.name}
            >
              <div className="relative aspect-2/2 w-full overflow-hidden bg-[#ffe7df]">
                <Image
                  src={pet.image}
                  alt={pet.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 90vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-[#2e2804]">{pet.name}</h3>
                    <p className="text-sm text-gray-600">{pet.type}</p>
                  </div>
                  <span className="rounded-full bg-[#fb75631a] px-3 py-1 text-xs font-semibold text-[#fb7563ea]">
                    {pet.age}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetPets;
