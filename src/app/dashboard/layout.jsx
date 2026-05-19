import DashboardSidebar from "@/components/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <section className="min-h-screen bg-white py-10 text-[#2e2804] dark:bg-[#111111] dark:text-[#f8f4ea]">
      <div className="mx-auto grid w-11/12 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <DashboardSidebar />
        <div className="min-w-0 rounded-2xl border border-[#fb756326] bg-[#efe8d470] p-5 shadow-sm dark:border-[#fb75634d] dark:bg-[#1c1c1c] md:p-7">
          {children}
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
