"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import { FaCat } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { LuDog } from "react-icons/lu";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink = (active) =>
    pathname === active
      ? "text-[#fb7563ea] bg-black/20 rounded-full px-3"
      : "hover:underline hover:decoration-[#fb7563ea] hover:underline-offset-4";

  return (
    <div
      className={
        isHome
          ? isScrolled
            ? "fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-white/40 backdrop-blur-[10px]"
            : "absolute left-0 right-0 top-0 z-50 border-b border-white/10 bg-white/30 backdrop-blur-[10px]"
          : "sticky top-0 z-50 border-b bg-[#fb756309]"
      }
    >
      <nav className="relative mx-auto flex w-11/12 items-center justify-between py-2 md:py-3">
        <div>
          <Link href="/">
            <Image
              src="/assets/logo1.png"
              alt="PetHouse Logo"
              width={150}
              height={10}
            />
          </Link>
        </div>

        <div className="hidden md:block">
          <ul className="flex gap-6 text-gray-900 font-medium">
            <li className={navLink("/")}>
              <Link href="/">Home</Link>
            </li>
            <li className={navLink("/all-pets")}>
              <Link href="/all-pets" className="flex items-center gap-1">
                All Pets <LuDog />
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:block">
          <ul className="flex items-center gap-6 text-gray-900">
            <li className={`font-semibold ${navLink("/login")}`}>
              <Link className="flex items-center gap-1" href="/login">
                <CiLogin />Login
              </Link>
            </li>
            <li className="rounded-full hover:bg-[#f95f49] bg-[#fb7563ea] px-4 py-2">
              <Link
                className="flex items-center gap-1 font-semibold text-white"
                href="/signup"
              >
                <FaCat />Sign Up
              </Link>
            </li>
          </ul>
        </div>

        <button
          className="text-2xl text-gray-800 md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border bg-white p-4 shadow-lg md:hidden">
            <ul className="flex flex-col gap-4 text-gray-800 font-medium">
              <li className={navLink("/")}>
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className={navLink("/all-pets")}>
                <Link
                  href="/all-pets"
                  className="flex items-center gap-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Pets <LuDog />
                </Link>
              </li>
              <li className={`font-semibold ${navLink("/login")}`}>
                <Link
                  className="flex items-center gap-1"
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <CiLogin />Login
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-center gap-1 rounded-full bg-[#fb7563ea] px-4 py-2 font-semibold text-white"
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaCat />Sign Up
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
