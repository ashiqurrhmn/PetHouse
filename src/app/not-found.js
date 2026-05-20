import { Home, PawPrint, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[72vh] bg-white px-4 py-20 text-[#2e2804] dark:bg-[#111111] dark:text-[#f8f4ea]">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="relative grid h-28 w-28 place-items-center rounded-full bg-[#fb756326] text-[#fb7563ea] dark:bg-[#fb75634d]">
          <PawPrint size={48} strokeWidth={2.4} />
          <span className="absolute -right-2 -top-2 rounded-full bg-[#2e2804] px-3 py-1 text-sm font-black text-white dark:bg-[#f8f4ea] dark:text-[#2e2804]">
            404
          </span>
        </div>

        <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#fb7563ea]">
          Page Not Found
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-[#2e2804] dark:text-[#f8f4ea] md:text-5xl">
          This path wandered off
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#665f59] dark:text-gray-300">
          The page you are looking for does not exist or may have been moved.
          Head back home or keep exploring pets ready for adoption.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#fb7563ea] px-6 text-sm font-black text-white transition hover:bg-[#f95f49]"
          >
            <Home size={17} />
            Return Home
          </Link>
          <Link
            href="/all-pets"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#d6cbc6] bg-white px-6 text-sm font-black text-[#2e2804] transition hover:bg-[#fb756314] dark:border-[#4b5563] dark:bg-transparent dark:text-white"
          >
            <Search size={17} />
            Browse Pets
          </Link>
        </div>
      </div>
    </section>
  );
}
