import AddPetForm from "@/components/AddPetForm";
import React from "react";

const AddPetPage = () => {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-widest text-[#fb7563ea]">
        Listing
      </p>
      <h1 className="mt-2 text-3xl font-black text-[#2e2804] dark:text-[#f8f4ea]">
        Add Pet
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f6472] dark:text-gray-300">
        Add a new pet profile with clear details so adopters can understand the
        pet before sending a request.
      </p>

      <AddPetForm />
    </div>
  );
};

export default AddPetPage;
