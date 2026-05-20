"use client";

import { authClient } from "@/app/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const ListingDeleteButton = ({ pet, onPetDeleted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${pet._id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete pet");
      }

      onPetDeleted(pet._id);
      toast.success(`${pet.name} deleted successfully.`);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete this pet.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        type="button"
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#fb7563ea] px-3 text-xs font-black text-white transition hover:bg-[#f95f49]"
      >
        <Trash2 size={15} />
        Delete
      </Button>

      <AlertDialog.Backdrop isDismissable isKeyboardDismissDisabled={false}>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="border border-[#fb75634d] bg-[#fffaf4] dark:bg-[#161616]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <div>
                <AlertDialog.Heading className="text-2xl font-black text-[#2e2804] dark:text-[#f8f4ea]">
                  Delete Listing?
                </AlertDialog.Heading>
                <p className="mt-1 text-sm leading-6 text-[#665f59] dark:text-gray-300">
                  This will remove <strong>{pet.name}</strong> and its adoption requests.
                </p>
              </div>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <Button
                slot="close"
                className="rounded-full border border-[#d6cbc6] bg-white px-5 text-sm font-black text-[#2e2804] transition hover:bg-[#fb756314] dark:border-[#4b5563] dark:bg-transparent dark:text-white"
              >
                Keep Listing
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-full bg-[#fb7563ea] px-6 text-sm font-black text-white transition hover:bg-[#f95f49] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isDeleting ? "Deleting..." : "Delete Listing"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default ListingDeleteButton;
