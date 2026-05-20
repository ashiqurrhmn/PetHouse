"use client";

import { authClient } from "@/app/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import {
  BadgeDollarSign,
  Edit3,
  HeartPulse,
  Image as ImageIcon,
  Mail,
  MapPin,
  MessageSquareText,
  PawPrint,
  ShieldCheck,
  Sparkles,
  UserRound,
  VenusAndMars,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const inputClass =
  "h-10 w-full rounded-xl border border-[#dfe6ef] bg-white px-3 text-sm font-semibold text-[#2e2804] outline-none transition placeholder:text-[#8a7d76] focus:border-[#fb7563ea] focus:ring-4 focus:ring-[#fb756326] dark:border-[#3a302c] dark:bg-[#202020] dark:text-[#f8f4ea] dark:placeholder:text-gray-500";

const editableFields = {
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
  ownerEmail: "",
  description: "",
};
const editableFieldKeys = Object.keys(editableFields);

const Field = ({ label, icon: Icon, children }) => (
  <label className="block">
    <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#2e2804] dark:text-[#f8f4ea]">
      {Icon && <Icon size={16} className="text-[#fb7563ea]" />}
      {label}
    </span>
    {children}
  </label>
);

const makePetForm = (pet) => ({
  ...editableFields,
  ...pet,
  vaccinated: String(pet.vaccinated ?? ""),
});

const ListingEditButton = ({ pet, onPetUpdated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(() => makePetForm(pet));
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) {
      setFormData(makePetForm(pet));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const originalFormData = makePetForm(pet);
    const hasChanges = editableFieldKeys.some(
      (key) => String(formData[key] ?? "") !== String(originalFormData[key] ?? "")
    );

    if (!hasChanges) {
      toast.info("Nothing to change.");
      return;
    }

    setIsSaving(true);

    try {
      const { data: tokenData } = await authClient.token();
      const payload = {
        ...formData,
        vaccinated: formData.vaccinated === "true",
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pets/${formData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update pet");
      }

      onPetUpdated(payload);
      toast.success(`${formData.name} updated successfully.`);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Unable to update this pet.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={handleOpenChange}>
      <Button
        type="button"
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-[#fb756340] bg-white px-3 text-xs font-black text-[#2e2804] transition hover:bg-[#fb756314] dark:bg-[#202020] dark:text-white"
      >
        <Edit3 size={15} />
        Edit
      </Button>

      <AlertDialog.Backdrop isDismissable isKeyboardDismissDisabled={false}>
        <AlertDialog.Container className="max-w-5xl" size="lg">
          <AlertDialog.Dialog className="border border-[#fb75634d] bg-[#fffaf4] dark:bg-[#161616]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fb7563ea]">
                  Edit Listing
                </p>
                <AlertDialog.Heading className="mt-1 text-2xl font-black text-[#2e2804] dark:text-[#f8f4ea]">
                  Update {formData.name}
                </AlertDialog.Heading>
                
              </div>
            </AlertDialog.Header>
            <AlertDialog.Body className="max-h-[65vh] overflow-y-auto">
              <form id={`edit-pet-${pet._id}`} onSubmit={handleUpdate} className="space-y-6">
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
                      value={formData.ownerEmail || ""}
                      readOnly
                      className={`${inputClass} bg-[#f1f5f9] text-[#526071] dark:bg-[#282828]`}
                    />
                  </Field>
                </div>

                <Field label="Description" icon={MessageSquareText}>
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
              </form>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                slot="close"
                className="rounded-full border border-[#d6cbc6] bg-white px-5 text-sm font-black text-[#2e2804] transition hover:bg-[#fb756314] dark:border-[#4b5563] dark:bg-transparent dark:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form={`edit-pet-${pet._id}`}
                disabled={isSaving}
                className="rounded-full bg-[#fb7563ea] px-6 text-sm font-black text-white transition hover:bg-[#f95f49] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default ListingEditButton;
