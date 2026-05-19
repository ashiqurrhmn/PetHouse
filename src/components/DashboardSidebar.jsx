"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, LayoutList, PlusCircle } from "lucide-react";
import React from "react";

const menuItems = [
  {
    href: "/dashboard/my-request",
    label: "My Request",
    icon: ClipboardList,
  },
  {
    href: "/dashboard/add-pet",
    label: "Add Pet",
    icon: PlusCircle,
  },
  {
    href: "/dashboard/my-listings",
    label: "My Listings",
    icon: LayoutList,
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="rounded-2xl border border-[#fb756326] bg-white p-4 shadow-sm dark:border-[#fb75634d] dark:bg-[#1c1c1c] lg:sticky lg:top-24">
      <div className="mb-5 rounded-2xl bg-[#efe8d470] px-4 py-3 dark:bg-[#262220]">
        <p className="text-xs font-bold uppercase tracking-widest text-[#fb7563ea]">
          Dashboard
        </p>
        <h2 className="mt-1 text-xl font-black text-[#2e2804] dark:text-[#f8f4ea]">
          PetHouse Panel
        </h2>
      </div>

      <nav className="grid gap-2">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-[#fb7563ea] text-white shadow-sm"
                  : "text-[#2e2804] hover:bg-[#fb756314] hover:text-[#fb7563ea] dark:text-[#f8f4ea] dark:hover:bg-[#fb75631f]"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
