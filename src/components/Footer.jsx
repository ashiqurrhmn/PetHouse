import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-14 border-t border-[#fb756340] bg-linear-to-b from-[#fff7f5] to-[#fff0ec] text-gray-800">
      <div className="mx-auto w-11/12 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/assets/logo1.png"
              alt="PetHouse Logo"
              width={200}
              height={100}
            />
            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-600">
              Helping loving families find their perfect pets with safe adoption and caring support.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full border border-[#fb756380] p-2 text-[#fb7563ea] transition hover:bg-[#fb7563ea] hover:text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full border border-[#fb756380] p-2 text-[#fb7563ea] transition hover:bg-[#fb7563ea] hover:text-white"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="rounded-full border border-[#fb756380] p-2 text-[#fb7563ea] transition hover:bg-[#fb7563ea] hover:text-white"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link className="transition hover:text-[#fb7563ea]" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#fb7563ea]" href="/all-pets">
                  All Pets
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#fb7563ea]" href="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#fb7563ea]" href="/signup">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link className="transition hover:text-[#fb7563ea]" href="#">
                  Adoption Guide
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#fb7563ea]" href="#">
                  Pet Care Tips
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#fb7563ea]" href="#">
                  FAQs
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#fb7563ea]" href="#">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Get In Touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <HiOutlineLocationMarker className="mt-0.5 text-lg text-[#fb7563ea]" />
                <span>123 Pet Street, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <HiOutlinePhone className="text-lg text-[#fb7563ea]" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineMail className="text-lg text-[#fb7563ea]" />
                <span>support@pethouse.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#fb756340] pt-5 text-center text-sm text-gray-500">
          <p>&copy; {year} PetHouse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
