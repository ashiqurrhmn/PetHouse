"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import { FaCat } from "react-icons/fa";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { LuDog } from "react-icons/lu";
import { authClient } from "@/app/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { ArrowDownToLine, LogOut } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = pathname === "/";

  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
      await authClient.signOut();
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const theme = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("themeChange", onStoreChange);

      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("themeChange", onStoreChange);
      };
    },
    () =>
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    () => "light",
  );

  const isDark = theme === "dark";

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(new Event("themeChange"));
  };

  const navLink = (active) =>
    pathname === active
      ? "text-[#fb7563ea] bg-black/15 dark:bg-white/15 rounded-full px-3"
      : "hover:underline hover:decoration-[#fb7563ea] hover:underline-offset-4";

  return (
    <div
      className={
        isHome
          ? isScrolled
            ? "fixed left-0 right-0 top-0 z-50 border-b border-black/10 bg-white/40 backdrop-blur-[10px] dark:border-white/10 dark:bg-[#12121299]"
            : "absolute left-0 right-0 top-0 z-50 border-b border-black/10 bg-white/40 backdrop-blur-[10px] dark:border-white/10 dark:bg-[#12121299]"
          : "sticky left-0 right-0 top-0 z-50 border-b border-black/10 bg-white/40 backdrop-blur-[10px] dark:border-white/10 dark:bg-[#12121299]"
      }
    >
      <nav className="relative mx-auto flex w-11/12 items-center justify-between md:py-3">
        <div>
          <Link href="/">
            <Image
              src="/assets/logo1.png"
              alt="PetHouse Logo"
              width={150}
              height={100}
            />
          </Link>
        </div>

        <div className="hidden md:block">
          <ul className="flex gap-6 font-medium text-gray-900 dark:text-gray-100">
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
          <ul className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
            {user ? (
              <>
                <Dropdown>
                  <Dropdown.Trigger className="rounded-full">
                    <div className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-[#2d2d2d] px-3 py-2 rounded-full transition">
                      <Avatar>
                        <Avatar.Image referrerPolicy="no-referer" alt="" src={user?.image} />
                        <Avatar.Fallback delayMs={600}>
                          {user.name[0]}
                        </Avatar.Fallback>
                      </Avatar>
                      <span>
                        <ArrowDownToLine size={16} strokeWidth={2} />
                      </span>
                    </div>
                  </Dropdown.Trigger>
                  <Dropdown.Popover>
                    <div className="px-3 pt-3 pb-1">
                      <div className="flex items-center gap-2">
                        <Avatar size="sm">
                          <Avatar.Image referrerPolicy="no-referer" alt="" src={user?.image} />
                          <Avatar.Fallback delayMs={600}>
                            {user.name[0]}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col gap-0">
                          <p className="text-sm leading-5 font-medium">
                            {user.name}
                          </p>
                          <p className="text-xs leading-none text-muted">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Dropdown.Menu>
                      <Dropdown.Item id="dashboard" textValue="Dashboard">
                        <Label>Dashboard</Label>
                      </Dropdown.Item>

                      <Dropdown.Item
                      onClick={handleLogout}
                        id="logout"
                        textValue="Logout"
                        variant="danger"
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <Label>Log Out</Label>
                          <ArrowRightFromSquare className="size-3.5 text-danger" />
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </>
            ) : (
              <>
                <li className={`font-semibold ${navLink("/login")}`}>
                  <Link className="flex items-center gap-1" href="/login">
                    <CiLogin />
                    Login
                  </Link>
                </li>
                <li className="rounded-full bg-[#fb7563ea] px-4 py-2 hover:bg-[#f95f49]">
                  <Link
                    className="flex items-center gap-1 font-semibold text-white"
                    href="/signup"
                  >
                    <FaCat />
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="rounded-full border border-black/15 bg-white/45 px-3 py-2 transition hover:bg-gray-100 dark:border-white/20 dark:bg-[#1a1a1a] dark:hover:bg-[#2d2d2d]"
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  {isDark ? <FiSun /> : <FiMoon />}
                </span>
              </button>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <div className="md:hidden">
            {user ? (
              <>
                <Dropdown>
                  <Dropdown.Trigger className="rounded-full">
                    <div className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-[#2d2d2d] px-1 py-1 rounded-full transition">
                      <Avatar>
                        <Avatar.Image referrerPolicy="no-referer"  alt="Junior Garcia" src={user?.image} />
                        <Avatar.Fallback delayMs={600}>
                          {user.name[0]}
                        </Avatar.Fallback>
                      </Avatar>
                      <span>
                        <ArrowDownToLine size={16} strokeWidth={2} />
                      </span>
                    </div>
                  </Dropdown.Trigger>
                  <Dropdown.Popover>
                    <div className="px-3 pt-3 pb-1">
                      <div className="flex items-center gap-2">
                        <Avatar size="sm">
                          <Avatar.Image referrerPolicy="no-referer" alt="Jane" src={user?.image} />
                          <Avatar.Fallback delayMs={600}>
                            {user.name[0]}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col gap-0">
                          <p className="text-sm leading-5 font-medium">
                            {user.name}
                          </p>
                          <p className="text-xs leading-none text-muted">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Dropdown.Menu>
                      <Dropdown.Item id="dashboard" textValue="Dashboard">
                        <Label>Dashboard</Label>
                      </Dropdown.Item>

                      <Dropdown.Item
                      onClick={handleLogout}
                        id="logout"
                        textValue="Logout"
                        variant="danger"
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <Label>Log Out</Label>
                          <ArrowRightFromSquare className="size-3.5 text-danger" />
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </>
            ) : (
              <></>
            )}
          </div>
          <button
            className="text-2xl text-gray-800 dark:text-gray-100 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-black/10 bg-white p-4 shadow-lg dark:border-white/10 dark:bg-[#1d1d1d] md:hidden">
            <ul className="flex flex-col gap-4 font-medium text-gray-800 dark:text-gray-100">
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
                  All Pets
                </Link>
              </li>
              {user ? (
                <>
                  <li className={navLink("/dashboard")}>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className={navLink("/logout")}>
                    <button
                    onClick={handleLogout}
                      href="/logout"
                      className="flex items-center gap-1"
                      
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className={`font-semibold ${navLink("/login")}`}>
                    <Link
                      className="flex items-center gap-1"
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CiLogin />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center justify-center gap-1 rounded-full bg-[#fb7563ea] px-4 py-2 font-semibold text-white"
                      href="/signup"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaCat />
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 font-semibold text-gray-800 dark:border-white/20 dark:bg-[#202020] dark:text-gray-100"
                >
                  {isDark ? <FiSun /> : <FiMoon />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
