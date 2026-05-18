"use client";

import { useState } from "react";
import { Rabbit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaPaw } from "react-icons/fa";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user);

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.photoUrl || undefined,
    });
    if(data){
      redirect('/login');
    }
    if (error) {
      toast.error(error.message);
      return;
    }

    console.log({ data, error });
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#fff8f3] via-[#fffdfb] to-[#fef7ef] px-4 py-10 dark:from-[#161311] dark:via-[#1a1714] dark:to-[#15120f]">
      <div className="pointer-events-none absolute -left-24 bottom-6 h-72 w-72 rounded-full bg-[#fb75632b] blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-24 h-64 w-64 rounded-full bg-[#84cc1633] blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-[#00000010] bg-white/80 shadow-2xl backdrop-blur-sm dark:border-white/10 dark:bg-[#1f1b18]/85 lg:grid-cols-2">
        <div className="p-5 sm:p-7">
          <p className="inline-block rounded-full bg-[#fb756320] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#d45241] dark:bg-[#fb75633a] dark:text-[#ffa898]">
            Join PetHouse
          </p>
          <h1 className="mt-4 text-3xl font-extrabold text-[#2e2804] dark:text-[#f5eee8]">
            Create your adopter account
          </h1>

          <form onSubmit={handleSubmit} className="mt-5 space-y-2.5">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-semibold text-[#3a332e] dark:text-[#e8ddd3]"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-[#d7cbc2] bg-white px-4 py-2.5 text-sm text-[#2b241f] outline-none transition focus:border-[#fb7563] focus:ring-2 focus:ring-[#fb756340] dark:border-[#3a332e] dark:bg-[#25211e] dark:text-[#f9f4ef]"
              />
            </div>

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
                className="w-full rounded-xl border border-[#d7cbc2] bg-white px-4 py-2.5 text-sm text-[#2b241f] outline-none transition focus:border-[#fb7563] focus:ring-2 focus:ring-[#fb756340] dark:border-[#3a332e] dark:bg-[#25211e] dark:text-[#f9f4ef]"
              />
            </div>

            <div>
              <label
                htmlFor="photoUrl"
                className="mb-1 block text-sm font-semibold text-[#3a332e] dark:text-[#e8ddd3]"
              >
                Photo URL
              </label>
              <input
                id="photoUrl"
                name="photoUrl"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-xl border border-[#d7cbc2] bg-white px-4 py-2.5 text-sm text-[#2b241f] outline-none transition focus:border-[#fb7563] focus:ring-2 focus:ring-[#fb756340] dark:border-[#3a332e] dark:bg-[#25211e] dark:text-[#f9f4ef]"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-semibold text-[#3a332e] dark:text-[#e8ddd3]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                minLength={6}
                pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                className="w-full rounded-xl border border-[#d7cbc2] bg-white px-4 py-2.5 pr-12 text-sm text-[#2b241f] outline-none transition focus:border-[#fb7563] focus:ring-2 focus:ring-[#fb756340] dark:border-[#3a332e] dark:bg-[#25211e] dark:text-[#f9f4ef]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-8.5 rounded-md p-1 text-[#7a6d64] transition hover:text-[#3a332e] dark:text-[#b7a89d] dark:hover:text-[#f9f4ef]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <p className="mt-2 text-xs text-green-500 dark:text-[#b8a99e]">
                At least 6 characters, one uppercase letter, one lowercase
                letter.
              </p>
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm font-semibold text-[#3a332e] dark:text-[#e8ddd3]"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                minLength={6}
                className="w-full rounded-xl border border-[#d7cbc2] bg-white px-4 py-2.5 pr-12 text-sm text-[#2b241f] outline-none transition focus:border-[#fb7563] focus:ring-2 focus:ring-[#fb756340] dark:border-[#3a332e] dark:bg-[#25211e] dark:text-[#f9f4ef]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-8.5 rounded-md p-1 text-[#7a6d64] transition hover:text-[#3a332e] dark:text-[#b7a89d] dark:hover:text-[#f9f4ef]"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#fb7563] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#f95f49]"
            >
              <FaHeart /> Create Account
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
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#d7cbc2] bg-white px-4 py-2.5 text-sm font-semibold text-[#2b241f] transition hover:bg-[#fff8f4] dark:border-[#3a332e] dark:bg-[#25211e] dark:text-[#f9f4ef] dark:hover:bg-[#2d2824]"
            >
              <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.7 15 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.2 0 9.8-2 13.3-5.2l-6.1-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.6 39.6 16.2 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.2 5.3-6.1 6.8l6.1 5.2C38.9 36.7 44 31 44 24c0-1.3-.1-2.4-.4-3.5z"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#5e544d] dark:text-[#c7b9af]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#d45241] hover:underline dark:text-[#ff9f91]"
            >
              Log in
            </Link>
          </p>
        </div>

        <div className="relative hidden min-h-140 p-8 lg:block">
          <Image
            src="/assets/rabbit.jpg"
            alt="rabbit"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur-sm">
              <Rabbit className="text-[#ffd166]" /> Start Adopting
            </p>
            <h2 className="text-3xl font-bold leading-tight">
              Every sign-up brings one more pet closer to a safe home.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
