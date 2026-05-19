"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";

export function RequestCancelAlert( {request} ) {
 const handleCancel = async () => {
  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/adoptions/${request._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    window.location.reload();

    toast.success(`Your adoption request for ${request.petName} has been cancelled.`);
  } catch (error) {
    console.log(error);
    toast.error("Failed to cancel adoption request.");
  }
};

  return (
    <AlertDialog>
      <Button
        type="button"
        className="inline-flex items-center rounded-full bg-[#fb7563ea] px-4 py-2 text-xs font-black text-white transition hover:bg-[#f95f49]"
      >
        Cancel
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete adoption request for <strong>{request.petName}</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" className="bg-[#fb7563ea] px-4 py-2 text-xs font-black text-white transition hover:bg-[#f95f49]" onClick={handleCancel}>
                Delete Request
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
