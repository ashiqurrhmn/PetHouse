"use client";

import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaPaw } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#fff7f4] via-[#fffdfb] to-[#fff7ef] px-4 dark:from-[#151312] dark:via-[#191715] dark:to-[#141312] py-25">
      <div className="pointer-events-none absolute -left-16 top-24 h-64 w-64 rounded-full bg-[#fb756336] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-[#facc1533] blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl items-stretch overflow-hidden rounded-3xl border border-[#00000010] bg-white/80 shadow-2xl backdrop-blur-sm dark:border-white/10 dark:bg-[#1f1c19]/85 lg:grid-cols-2">
        <div className="relative hidden min-h-140 p-8 lg:block">
          <Image
            src="/assets/loginCat.jpg"
            alt="Friendly pet waiting for adoption"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur-sm">
              <FaPaw className="text-[#ffd166]" /> Welcome Back
            </p>
            <h2 className="text-3xl font-bold leading-tight">
              Continue your journey to find a lifelong furry friend.
            </h2>
          </div>
        </div>

        <div className="p-7 sm:p-10">
          <p className="inline-block rounded-full bg-[#fb756320] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#d45241] dark:bg-[#fb75633a] dark:text-[#ffa898]">
            PetHouse Login
          </p>
          <h1 className="mt-4 text-3xl font-extrabold text-[#2e2804] dark:text-[#f5eee8]">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-[#2e2804]dark:text-[#ccbfb5]">
            Track applications, save favorite pets, and manage adoption updates.
          </p>

          <form className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-semibold text-[#3a332e] dark:text-[#e8ddd3]"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#d7cbc2] bg-white px-4 py-3 text-sm text-[#2b241f] outline-none transition focus:border-[#fb7563] focus:ring-2 focus:ring-[#fb756340] dark:border-[#3a332e] dark:bg-[#25211e] dark:text-[#f9f4ef]"
              />
            </div>

            <div className="relative">
              <div className="mb-1 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#3a332e] dark:text-[#e8ddd3]"
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-[#d7cbc2] bg-white px-4 py-3 pr-12 text-sm text-[#2b241f] outline-none transition focus:border-[#fb7563] focus:ring-2 focus:ring-[#fb756340] dark:border-[#3a332e] dark:bg-[#25211e] dark:text-[#f9f4ef]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-9.75 rounded-md p-1 text-[#7a6d64] transition hover:text-[#3a332e] dark:text-[#b7a89d] dark:hover:text-[#f9f4ef]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="mt-3 w-full rounded-xl bg-[#fb7563] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#f95f49] flex items-center justify-center gap-1"
            >
              Log In <span><LogIn size={16} strokeWidth={2.5} /></span>
            </button>

            <div className="flex items-center gap-3 pt-2">
              <span className="h-px flex-1 bg-[#d8ccc3] dark:bg-[#3a332e]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7a6d64] dark:text-[#b7a89d]">
                or
              </span>
              <span className="h-px flex-1 bg-[#d8ccc3] dark:bg-[#3a332e]" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#d7cbc2] bg-white px-4 py-3 text-sm font-semibold text-[#2b241f] transition hover:bg-[#fff8f4] dark:border-[#3a332e] dark:bg-[#25211e] dark:text-[#f9f4ef] dark:hover:bg-[#2d2824]"
            >
              <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.8-2 13.3-5.2l-6.1-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.6 39.6 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.2 5.3-6.1 6.8l6.1 5.2C38.9 36.7 44 31 44 24c0-1.3-.1-2.4-.4-3.5z" />
              </svg>
              Sign in with Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#5e544d] dark:text-[#c7b9af]">
            New to PetHouse?{" "}
            <Link
              href="/signup"
              className="font-bold text-[#d45241] hover:underline dark:text-[#ff9f91]"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
