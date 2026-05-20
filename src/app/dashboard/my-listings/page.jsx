"use client";

import { authClient } from "@/app/lib/auth-client";
import ListingCard, {
  normalizeStatus,
} from "@/components/listings/ListingCard";
import ListingStatCard from "@/components/listings/ListingStatCard";
import { Spinner } from "@heroui/react";
import { Inbox } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const MyListingsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    const fetchListings = async () => {
      if (!user?.id && !user?.email) {
        setPets([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const { data: tokenData } = await authClient.token();
        const params = new URLSearchParams();
        if (user?.id) params.set("userId", user.id);
        if (user?.email) params.set("ownerEmail", user.email);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pets?${params.toString()}`,
          {
            headers: {
              authorization: `Bearer ${tokenData?.token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data = await res.json();
        setPets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load your listings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [isPending, user?.email, user?.id]);

  const stats = useMemo(() => {
    const adopted = pets.filter(
      (pet) => normalizeStatus(pet.status) === "adopted",
    ).length;
    return {
      total: pets.length,
      adopted,
      available: pets.length - adopted,
    };
  }, [pets]);

  const handlePetUpdated = (updatedPet) => {
    setPets((current) =>
      current.map((pet) =>
        pet._id === updatedPet._id ? { ...pet, ...updatedPet } : pet,
      ),
    );
  };

  const handlePetDeleted = (petId) => {
    setPets((current) => current.filter((pet) => pet._id !== petId));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-[#fb7563ea]">
          Listings
        </p>
        <h1 className="mt-2 text-3xl font-black text-[#2e2804] dark:text-[#f8f4ea]">
          My Listings
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f6472] dark:text-gray-300">
          Manage your pet profiles, review adoption requests, and keep each
          listing fresh for adopters.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <ListingStatCard
          label="Total Listings"
          value={stats.total}
          tone="text-[#2e2804] dark:text-[#f8f4ea]"
        />
        <ListingStatCard
          label="Available"
          value={stats.available}
          tone="text-[#20b97b]"
        />
        <ListingStatCard
          label="Adopted"
          value={stats.adopted}
          tone="text-[#fb7563ea]"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-6 border-[#fb756326] bg-white dark:border-[#fb75634d] dark:bg-[#161616]">
          <Spinner size="lg" className="text-[#fb7563ea]" />
        </div>
      ) : pets.length === 0 ? (
        <div className="rounded-3xl border border-[#fb756326] bg-white p-12 text-center shadow-sm dark:border-[#fb75634d] dark:bg-[#161616]">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#fb756326] text-[#fb7563ea] dark:bg-[#fb75634d]">
            <Inbox size={32} />
          </div>
          <h2 className="text-2xl font-black text-[#2e2804] dark:text-[#f8f4ea]">
            No listings found
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#665f59] dark:text-gray-300">
            Add your first pet listing.
          </p>
          <Link
            href="/dashboard/add-pet"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#fb7563ea] px-6 text-sm font-black text-white transition hover:bg-[#f95f49]"
          >
            Add Pet
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {pets.map((pet) => (
            <ListingCard
              key={pet._id}
              pet={pet}
              onPetDeleted={handlePetDeleted}
              onPetUpdated={handlePetUpdated}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;
