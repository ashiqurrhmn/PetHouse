import Link from "next/link";
import { ClipboardList, LayoutList, PlusCircle } from "lucide-react";
import React from "react";

const dashboardCards = [
  {
    href: "/dashboard/my-request",
    title: "My Request",
    description: "View your adoption requests.",
    icon: ClipboardList,
  },
  {
    href: "/dashboard/add-pet",
    title: "Add Pet",
    description: "Create a new pet listing.",
    icon: PlusCircle,
  },
  {
    href: "/dashboard/my-listings",
    title: "My Listings",
    description: "Manage pets you have listed.",
    icon: LayoutList,
  },
];

const DashboardPage = () => {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-widest text-[#fb7563ea]">
        Welcome Back
      </p>
      <h1 className="mt-2 text-3xl font-black text-[#2e2804] dark:text-[#f8f4ea]">
        Dashboard
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f6472] dark:text-gray-300">
        Choose an option from the side menu to manage adoption requests, add a
        pet, or review your listings.
      </p>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {dashboardCards.map(({ href, title, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl border border-[#fb756326] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#fb756380] hover:shadow-md dark:border-[#fb75634d] dark:bg-[#202020]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#fb756314] text-[#fb7563ea] dark:bg-[#fb756326]">
              <Icon size={20} />
            </span>
            <h2 className="mt-4 text-lg font-black text-[#2e2804] dark:text-[#f8f4ea]">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5f6472] dark:text-gray-300">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
