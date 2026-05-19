"use client";

import { authClient } from "@/app/lib/auth-client";
import {
  CalendarDays,
  Heart,
  Mail,
  MessageSquareText,
  PawPrint,
  UserRound,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const FieldShell = ({ label, icon: Icon, children }) => (
  <label className="block">
    <span className="mb-1.5 block text-xs font-bold text-[#2e2804] dark:text-[#f8f4ea]">
      {label}
    </span>
    <span className="relative block">
      {Icon && (
        <Icon
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#fb7563ea]"
        />
      )}
      {children}
    </span>
  </label>
);

const inputClass =
  "h-10 w-full rounded-full border border-[#dfe6ef] bg-white px-4 text-sm font-semibold text-[#2e2804] outline-none transition placeholder:text-[#8a7d76] focus:border-[#fb7563ea] focus:ring-4 focus:ring-[#fb756326] disabled:bg-[#f1f5f9] disabled:text-[#526071] dark:border-[#3a302c] dark:bg-[#202020] dark:text-[#f8f4ea] dark:placeholder:text-gray-500 dark:disabled:bg-[#282828]";

const AdoptionForm =  ({ petName }) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    toast.success(`Your adoption request for ${petName} has been submitted.`);
    setPickupDate("");
    setMessage("");
  };

  return (
    <aside className=" min-w-0 rounded-3xl border border-[#fb756326] bg-white p-4 shadow-xl shadow-[#2e280414] dark:border-[#fb75634d] dark:bg-[#1c1c1c] dark:shadow-black/30 sm:p-5">
      <div className="mb-5 flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fb756314] text-[#fb7563ea] dark:bg-[#fb756326]">
          <Heart size={19} />
        </span>
        <div>
          <h2 className="text-lg font-black text-[#2e2804] dark:text-[#f8f4ea]">
            Request to Adopt {petName}
          </h2>
          <p className="mt-1 text-xs leading-5 text-[#665f59] dark:text-gray-300">
            Fill out this form and the owner will review your request.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FieldShell label="Pet Name" icon={PawPrint}>
          <input
            type="text"
            name="petName"
            value={petName}
            readOnly
            className={`${inputClass} pl-11`}
          />
        </FieldShell>

        <FieldShell label="User Name" icon={UserRound}>
          <input
            type="text"
            name="userName"
            value={isPending ? "Loading..." : user?.name}
            readOnly
            className={`${inputClass} pl-11`}
          />
        </FieldShell>

        <FieldShell label="User Email" icon={Mail}>
          <input
            type="email"
            name="userEmail"
            value={isPending ? "Loading..." : user?.email}
            readOnly
            className={`${inputClass} pl-11`}
          />
        </FieldShell>

        <FieldShell label="Pickup Date" icon={CalendarDays}>
          <input
            type="date"
            name="pickupDate"
            value={pickupDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(event) => setPickupDate(event.target.value)}
            required
            className={`${inputClass} pl-11`}
          />
        </FieldShell>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-[#2e2804] dark:text-[#f8f4ea]">
            Message
          </span>
          <span className="relative block">
            <MessageSquareText
              size={17}
              className="pointer-events-none absolute left-4 top-4 text-[#fb7563ea]"
            />
            <textarea
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
              required
              placeholder={`Leave a message for ${petName}...`}
              className="w-full resize-none rounded-3xl border border-[#dfe6ef] bg-white px-4 py-3 pl-11 text-sm font-medium leading-6 text-[#2e2804] outline-none transition placeholder:text-[#8a7d76] focus:border-[#fb7563ea] focus:ring-4 focus:ring-[#fb756326] dark:border-[#3a302c] dark:bg-[#202020] dark:text-[#f8f4ea] dark:placeholder:text-gray-500"
            />
          </span>
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#fb7563ea] px-6 text-sm font-black text-white shadow-sm transition hover:bg-[#f95f49] disabled:cursor-not-allowed disabled:opacity-70"
        >
          Adopt {petName}
          <PawPrint size={18} />
        </button>
      </form>
    </aside>
  );
};

export default AdoptionForm;
