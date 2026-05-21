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
import React, { useEffect, useMemo, useState } from "react";
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

const AdoptionForm = ({ pet }) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");
  const [hasExistingRequest, setHasExistingRequest] = useState(false);
  const [isCheckingRequest, setIsCheckingRequest] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOwner = user?.id && pet?.userId && user.id === pet.userId;
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    const checkExistingRequest = async () => {
      if (!user?.id || !pet?._id || isOwner) {
        setHasExistingRequest(false);
        return;
      }

      setIsCheckingRequest(true);

      try {
        const { data: tokenData } = await authClient.token();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/adoptions/${user.id}`,
          {
            cache: "no-store",
            headers: {
              authorization: `Bearer ${tokenData?.token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Failed to check existing adoption requests");
        }

        const requests = await res.json();
        const alreadyRequested = Array.isArray(requests)
          ? requests.some((request) => request.petId === pet._id)
          : false;

        setHasExistingRequest(alreadyRequested);
      } catch (error) {
        console.error(error);
        toast.error("Unable to check your previous adoption requests.");
      } finally {
        setIsCheckingRequest(false);
      }
    };

    checkExistingRequest();
  }, [isOwner, pet?._id, user?.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user?.id) {
      toast.error("Please login before submitting an adoption request.");
      return;
    }

    if (hasExistingRequest) {
      toast.info(`You have already submitted a request for ${pet.name}.`);
      return;
    }

    setIsSubmitting(true);

    const adoptData = {
      petName: pet.name,
      petId: pet._id,
      status: "Pending",
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      pickupDate: new Date(pickupDate).toISOString().split("T")[0],
      message,
      requestDate: today,
    };

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adoptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(adoptData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || "Failed to submit adoption request");
      }

      toast.success(`Your adoption request for ${pet.name} has been submitted.`);
      setHasExistingRequest(true);
      setPickupDate("");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to submit adoption request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isOwner) {
    return (
      <aside className=" min-w-0 rounded-3xl border border-[#fb756326] bg-white p-4 shadow-xl shadow-[#2e280414] dark:border-[#fb75634d] dark:bg-[#1c1c1c] dark:shadow-black/30 sm:p-5">
        <div className="mb-0 flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fb756314] text-[#fb7563ea] dark:bg-[#fb756326]">
            <Heart size={19} />
          </span>
          <div>
            <h2 className="text-lg font-black text-[#2e2804] dark:text-[#f8f4ea]">
              This is Your Pet
            </h2>
            <p className="mt-1 text-sm leading-5 text-[#665f59] dark:text-gray-300">
              You cannot adopt your own pet listing. Only other users can request to adopt {pet.name}.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className=" min-w-0 rounded-3xl border border-[#fb756326] bg-white p-4 shadow-xl shadow-[#2e280414] dark:border-[#fb75634d] dark:bg-[#1c1c1c] dark:shadow-black/30 sm:p-5">
      <div className="mb-5 flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fb756314] text-[#fb7563ea] dark:bg-[#fb756326]">
          <Heart size={19} />
        </span>
        <div>
          <h2 className="text-lg font-black text-[#2e2804] dark:text-[#f8f4ea]">
            Request to Adopt {pet.name}
          </h2>
          <p className="mt-1 text-xs leading-5 text-[#665f59] dark:text-gray-300">
            {hasExistingRequest
              ? "You have already sent an adoption request for this pet."
              : "Fill out this form and the owner will review your request."}
          </p>
        </div>
      </div>

      {hasExistingRequest && (
        <div className="mb-4 rounded-2xl border border-[#fb756326] bg-[#fb756314] p-4 text-sm font-semibold leading-6 text-[#b3512f] dark:border-[#fb75634d] dark:bg-[#fb75631f] dark:text-[#f8c9c1]">
          Your adoption request for {pet.name} is already submitted. You cannot
          submit another request for the same pet.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FieldShell label="Pet Name" icon={PawPrint}>
          <input
            type="text"
            name="petName"
            value={pet.name}
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
            min={today}
            onChange={(event) => setPickupDate(event.target.value)}
            required
            disabled={hasExistingRequest}
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
              disabled={hasExistingRequest}
              placeholder={`Leave a message for ${pet.name}...`}
              className="w-full resize-none rounded-3xl border border-[#dfe6ef] bg-white px-4 py-3 pl-11 text-sm font-medium leading-6 text-[#2e2804] outline-none transition placeholder:text-[#8a7d76] focus:border-[#fb7563ea] focus:ring-4 focus:ring-[#fb756326] dark:border-[#3a302c] dark:bg-[#202020] dark:text-[#f8f4ea] dark:placeholder:text-gray-500"
            />
          </span>
        </label>

        <button
          type="submit"
          disabled={isPending || isCheckingRequest || isSubmitting || hasExistingRequest}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#fb7563ea] px-6 text-sm font-black text-white shadow-sm transition hover:bg-[#f95f49] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isCheckingRequest
            ? "Checking request..."
            : isSubmitting
              ? "Submitting..."
              : hasExistingRequest
                ? "Request Already Submitted"
                : `Adopt ${pet.name}`}
          <PawPrint size={18} />
        </button>
      </form>
    </aside>
  );
};

export default AdoptionForm;
