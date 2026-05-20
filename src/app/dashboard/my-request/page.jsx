import { auth } from "@/app/lib/auth";
import { RequestCancelAlert } from "@/components/RequestCancelAlert";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

const statusStyles = {
  Pending: "bg-yellow-200 text-[#b3512f]",
  Approved: "bg-[#4caf5026] text-[#26743f]",
  Rejected: "bg-[#f4433626] text-red-600",
};

const MyRequestPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user;

  const {token} = await auth.api.getToken({
    headers: await headers(),
  })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/adoptions/${user?.id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }
  );
  const requests = await res.json();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-[#fb7563ea]">
          Adoption
        </p>
        <h1 className="mt-2 text-3xl font-black text-[#2e2804] dark:text-[#f8f4ea]">
          My Request
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f6472] dark:text-gray-300">
          View the status of your pet adoption requests and manage them from one
          place.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-[32px] border border-[#fb756326] bg-white p-12 text-center shadow-sm dark:border-[#fb75634d] dark:bg-[#161616]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fb756326] dark:bg-[#fb75634d]">
            <svg
              className="h-8 w-8 text-[#fb7563ea]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-[#2e2804] dark:text-[#f8f4ea]">
            No adoption requests found
          </h2>
          
          <Link
            href="/all-pets"
            className="mt-6 inline-flex items-center rounded-full bg-[#fb7563ea] px-6 py-3 text-sm font-black text-white transition hover:bg-[#f95f49]"
          >
            Explore All Pets
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[32px] border border-[#fb756326] bg-white shadow-sm dark:border-[#fb75634d] dark:bg-[#161616]">
          <div className="hidden grid-cols-[1.4fr_1fr_1fr_0.9fr_1.2fr] gap-4 border-b border-[#fb756326] px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#2e2804] dark:text-[#f8f4ea] lg:grid">
            <span>Pet Name</span>
            <span>Request Date</span>
            <span>Pickup Date</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="divide-y divide-[#fb756326]/70 dark:divide-[#fb75634d]">
            {requests.map((request) => (
              <div
                key={request._id}
                className="grid gap-4 px-5 py-5 sm:grid-cols-[1.4fr_1fr_1fr_0.9fr_1.2fr] items-center"
              >
                <div>
                  <p className="text-base font-bold text-[#2e2804] dark:text-[#f8f4ea]">
                    {request.petName}
                  </p>
                  <p className="mt-1 text-sm text-[#5f6472] dark:text-gray-400 lg:hidden">
                    Request: {request.requestDate}
                  </p>
                </div>

                <div className="text-sm text-[#5f6472] dark:text-gray-400">
                  {request.requestDate}
                </div>

                <div className="text-sm text-[#5f6472] dark:text-gray-400">
                  {request.pickupDate}
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${statusStyles[request.status]}`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2 sm:justify-end">
                  <Link
                    href={`/all-pets/${request.petId}`}
                    className="inline-flex items-center rounded-full border border-[#2e2804]/10 bg-white px-4 py-2 text-xs font-bold text-[#2e2804] transition hover:bg-[#fb756326] dark:bg-[#202020d0] dark:hover:bg-[#2a2a2a] dark:text-white"
                  >
                    View
                  </Link>
                  <RequestCancelAlert request={request} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequestPage;
