"use client";

import { authClient } from "@/app/lib/auth-client";
import { set } from "better-auth";
import {
  BadgeDollarSign,
  HeartPulse,
  Image as ImageIcon,
  Mail,
  MapPin,
  PawPrint,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  Text,
  UserRound,
  VenusAndMars,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const initialForm = {
  name: "",
  species: "",
  breed: "",
  age: "",
  gender: "",
  image: "",
  healthStatus: "",
  vaccinated: "",
  location: "",
  adoptionFee: "",
  description: "",
};

const inputClass =
  "h-10 w-full rounded-xl border border-[#dfe6ef] bg-white px-3 text-sm font-semibold text-[#2e2804] outline-none transition placeholder:text-[#8a7d76] focus:border-[#fb7563ea] focus:ring-4 focus:ring-[#fb756326] dark:border-[#3a302c] dark:bg-[#202020] dark:text-[#f8f4ea] dark:placeholder:text-gray-500";

const Field = ({ label, icon: Icon, children }) => (
  <label className="block">
    <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#2e2804] dark:text-[#f8f4ea]">
      {Icon && <Icon size={16} className="text-[#fb7563ea]" />}
      {label}
    </span>
    {children}
  </label>
);

const AddPetForm = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const {data:tokenData} = await authClient.token();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      toast.success(`${user.name} added successfully!`);
      setFormData(initialForm);
    } catch (error) {
      console.error(error);
      toast.error("Unable to submit the pet. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-7 max-w-4xl space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Pet Name" icon={PawPrint}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter pet name"
            required
            className={inputClass}
          />
        </Field>

        <Field label="Species" icon={Sparkles}>
          <select
            name="species"
            value={formData.species}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select species</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Fish">Fish</option>
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field label="Breed" icon={PawPrint}>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Enter breed"
            required
            className={inputClass}
          />
        </Field>

        <Field label="Age" icon={UserRound}>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Example: 2 years"
            required
            className={inputClass}
          />
        </Field>

        <Field label="Gender" icon={VenusAndMars}>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </Field>

        <Field label="Image URL" icon={ImageIcon}>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://i.ibb.co/..."
            required
            className={inputClass}
          />
        </Field>

        <Field label="Health Status" icon={HeartPulse}>
          <input
            type="text"
            name="healthStatus"
            value={formData.healthStatus}
            onChange={handleChange}
            placeholder="Example: Good"
            required
            className={inputClass}
          />
        </Field>

        <Field label="Vaccination Status" icon={ShieldCheck}>
          <select
            name="vaccinated"
            value={formData.vaccinated}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select status</option>
            <option value="true">Vaccinated</option>
            <option value="false">Not Vaccinated</option>
          </select>
        </Field>

        <Field label="Location" icon={MapPin}>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, Country"
            required
            className={inputClass}
          />
        </Field>

        <Field label="Adoption Fee" icon={BadgeDollarSign}>
          <input
            type="number"
            name="adoptionFee"
            value={formData.adoptionFee}
            onChange={handleChange}
            placeholder="Enter amount"
            min="0"
            required
            className={inputClass}
          />
        </Field>

        <Field label="Owner Email" icon={Mail}>
          <input
            type="email"
            name="ownerEmail"
            value={isPending ? "Loading..." : user?.email || "Please login"}
            readOnly
            className={`${inputClass} bg-[#f1f5f9] text-[#526071] dark:bg-[#282828]`}
          />
        </Field>
      </div>

      <Field label="Description" icon={Text}>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          placeholder="Describe the pet's personality, habits, and ideal home..."
          required
          className="w-full resize-none rounded-2xl border border-[#dfe6ef] bg-white px-4 py-3 text-sm font-medium leading-7 text-[#2e2804] outline-none transition placeholder:text-[#8a7d76] focus:border-[#fb7563ea] focus:ring-4 focus:ring-[#fb756326] dark:border-[#3a302c] dark:bg-[#202020] dark:text-[#f8f4ea] dark:placeholder:text-gray-500"
        />
      </Field>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#fb7563ea] px-6 text-sm font-black text-white shadow-sm transition hover:bg-[#f95f49] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <PlusCircle size={18} />
          {isSubmitting ? "Adding..." : "Add Pet"}
        </button>
      </div>
    </form>
  );
};

export default AddPetForm;
