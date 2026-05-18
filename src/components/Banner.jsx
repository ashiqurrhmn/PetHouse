"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GiCat } from "react-icons/gi";

const slides = [
  {
    image: "/assets/banner2.png",
    title: "Give a Pet a Loving Home",
    description:
      "Every adoption changes two lives. Explore adorable pets and bring joy to your family.",
  },
  {
    image: "/assets/banner3.png",
    title: "Adopt Today, Love Forever",
    description:
      "Meet healthy, playful pets ready for adoption and make your home happier than ever.",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            className="relative h-[88vh] min-h-120 max-h-190 min-w-full"
            key={slide.image}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={slide.image === "/assets/banner3.png"}
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/35 via-black/25 to-black/15 dark:from-black/65 dark:via-black/45 dark:to-black/35" />

            <div className="absolute inset-0 mx-auto flex w-9/12 items-center pt-16 md:pt-20">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-4 max-w-xl text-sm text-gray-100 md:text-lg">
                  {slide.description}
                </p>
                <Link
                  href="/all-pets"
                  className="mt-8 inline-block rounded-lg bg-[#fb7563ea] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#f95f49] md:text-base"
                >
                  <span className="flex items-center gap-2">
                    Adopt Now <GiCat />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85 p-2 text-gray-800 shadow transition hover:bg-white dark:bg-[#161616]/85 dark:text-gray-100 dark:hover:bg-[#242424]"
      >
        <FiChevronLeft className="text-2xl" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85 p-2 text-gray-800 shadow transition hover:bg-white dark:bg-[#161616]/85 dark:text-gray-100 dark:hover:bg-[#242424]"
      >
        <FiChevronRight className="text-2xl" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.image}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition ${
              currentSlide === index
                ? "w-8 bg-[#fb7563ea]"
                : "w-2.5 bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
