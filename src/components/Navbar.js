"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import { FaCat } from "react-icons/fa";
import { LuDog } from "react-icons/lu";

const Navbar = () => {
  const pathname = usePathname();

  const navLink = (active) =>
    pathname === active
      ? "text-[#fb7563ea]"
      : "hover:underline hover:decoration-[#fb7563ea] hover:underline-offset-4";

  return (
    <div className="border-b">
    <nav className="flex justify-between items-center py-2 w-11/12 mx-auto">
        
      <div>
        <Link href={"/"}>
          <Image className=""
            src={'/assets/logo1.png'}
            alt="PetHouse Logo"
            width={150}
            height={10}
          />
        </Link>
      </div>
      <div >
        <ul className="flex gap-6 text-gray-800 font-medium">
          <li className={navLink("/")}>
            <Link href={"/"}>Home</Link>
          </li>
          <li className={navLink("/all-pets")}>
            <Link href={"/all-pets"} className="flex items-center gap-1">All Pets <LuDog /></Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex items-center gap-6">
            <li className={`font-semibold ${navLink("/login")}`}>
                <Link className="flex items-center gap-1 " href={'/login'}><CiLogin />Login</Link>
            </li>
            <li className="bg-[#fb7563ea] px-4 py-2 rounded-full">
                <Link className="flex items-center gap-1 font-semibold text-white" href={'/signup'}><FaCat />Sign Up</Link>
            </li>
        </ul>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
