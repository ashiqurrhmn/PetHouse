"use client";

import { authClient } from "@/app/lib/auth-client";
import { AlertDialog, Button, Spinner } from "@heroui/react";
import {
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  Inbox,
  Mail,
  MessageSquareText,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const statusStyles = {
  pending: "bg-yellow-200 text-[#b3512f]",
  approved: "bg-[#4caf5026] text-[#26743f]",
  rejected: "bg-[#f4433626] text-red-600",
};

const normalizeStatus = (status) => (status || "pending").toLowerCase();

const readJson = async (res) => {
  try {
    return await res.json();
  } catch {
    return {};
  }
};

const updateAdoptionStatus = async ({ request, status, token }) => {
  const payload = { status };
  const url = `${process.env.NEXT_PUBLIC_API_URL}/adoptions/${request._id}`;

  const patchRes = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (patchRes.ok) return readJson(patchRes);
  if (patchRes.status !== 404 && patchRes.status !== 405) {
    throw new Error("Failed to update adoption request");
  }

  const putRes = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!putRes.ok) {
    throw new Error("Failed to update adoption request");
  }

  return readJson(putRes);
};

const ListingRequestsButton = ({ pet, onPetUpdated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingRequestId, setUpdatingRequestId] = useState("");

  const loadRequests = async () => {
    setRequests([]);
    setIsLoading(true);

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/adoptions/pet/${pet._id}`,
        {
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load requests for this pet.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (request) => {
    if ((pet.status || "Available").toLowerCase() === "adopted") {
      toast.info(`${pet.name} is already adopted.`);
      return;
    }

    setUpdatingRequestId(`${request._id}-approve`);

    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      await updateAdoptionStatus({ request, status: "Approved", token });

      const pendingRequests = requests.filter(
        (item) =>
          item._id !== request._id && normalizeStatus(item.status) === "pending",
      );
      await Promise.all(
        pendingRequests.map((item) =>
          updateAdoptionStatus({ request: item, status: "Rejected", token }),
        ),
      );

      const petRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pets/${pet._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...pet, status: "Adopted" }),
        },
      );

      if (!petRes.ok) {
        throw new Error("Failed to update pet status");
      }

      const updatedPet = await readJson(petRes);
      setRequests((current) =>
        current.map((item) =>
          item._id === request._id
            ? { ...item, status: "Approved" }
            : normalizeStatus(item.status) === "pending"
              ? { ...item, status: "Rejected" }
              : item,
        ),
      );
      onPetUpdated?.({ ...pet, ...updatedPet, status: "Adopted" });
      toast.success(`${pet.name} is now marked as adopted.`);
    } catch (error) {
      console.error(error);
      toast.error("Unable to approve this request.");
    } finally {
      setUpdatingRequestId("");
    }
  };

  const handleReject = async (request) => {
    setUpdatingRequestId(`${request._id}-reject`);

    try {
      const { data: tokenData } = await authClient.token();
      await updateAdoptionStatus({
        request,
        status: "Rejected",
        token: tokenData?.token,
      });

      setRequests((current) =>
        current.map((item) =>
          item._id === request._id ? { ...item, status: "Rejected" } : item,
        ),
      );
      toast.success("Request rejected.");
    } catch (error) {
      console.error(error);
      toast.error("Unable to reject this request.");
    } finally {
      setUpdatingRequestId("");
    }
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) {
      loadRequests();
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={handleOpenChange}>
      <Button
        type="button"
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#2e2804] px-3 text-xs font-black text-white transition hover:bg-gray-300 dark:bg-[#f8f4ea] dark:text-[#2e2804]"
      >
        <HeartHandshake size={15} />
        Requests
      </Button>

      <AlertDialog.Backdrop isDismissable isKeyboardDismissDisabled={false}>
        <AlertDialog.Container className="max-w-3xl" size="lg">
          <AlertDialog.Dialog className="border border-[#fb75634d] bg-[#fffaf4] dark:bg-[#161616]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fb7563ea]">
                  PetHouse
                </p>
                <AlertDialog.Heading className="mt-1 text-2xl font-black text-[#2e2804] dark:text-[#f8f4ea]">
                  {pet.name} Requests
                </AlertDialog.Heading>
                <p className="mt-1 text-sm leading-6 text-[#665f59] dark:text-gray-300">
                  Review adopter messages and pickup dates for this listing.
                </p>
              </div>
            </AlertDialog.Header>
            <AlertDialog.Body className="max-h-[60vh] overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <Spinner size="sm" className="text-[#fb7563ea]" />
                </div>
              ) : requests.length === 0 ? (
                <div className="rounded-2xl bg-white p-8 text-center dark:bg-[#202020]">
                  <Inbox className="mx-auto text-[#fb7563ea]" size={34} />
                  <h3 className="mt-3 text-xl font-black text-[#2e2804] dark:text-[#f8f4ea]">
                    No requests yet
                  </h3>
                </div>
              ) : (
                <div className="space-y-3">
                  {requests.map((request) => (
                    <div key={request._id}>
                      {(() => {
                        const requestStatus = normalizeStatus(request.status);
                        const isApproved = requestStatus === "approved";
                        const isRejected = requestStatus === "rejected";
                        const isPetAdopted =
                          (pet.status || "Available").toLowerCase() === "adopted";
                        const isApproving =
                          updatingRequestId === `${request._id}-approve`;
                        const isRejecting =
                          updatingRequestId === `${request._id}-reject`;

                        return (
                          <div className="rounded-2xl border border-[#fb756326] bg-white p-4 dark:border-[#fb75634d] dark:bg-[#202020]">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="flex items-center gap-2 font-black text-[#2e2804] dark:text-[#f8f4ea]">
                                  <UserRound
                                    size={16}
                                    className="text-[#fb7563ea]"
                                  />
                                  {request.userName || "Adopter"}
                                </p>
                                <p className="mt-1 flex items-center gap-2 text-sm text-[#665f59] dark:text-gray-300">
                                  <Mail size={15} className="text-[#fb7563ea]" />
                                  {request.userEmail}
                                </p>
                              </div>
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest ${
                                  statusStyles[requestStatus] ||
                                  "bg-[#fb756314] text-[#fb7563ea]"
                                }`}
                              >
                                {request.status || "Pending"}
                              </span>
                            </div>
                            <div className="mt-3 grid gap-2 text-sm text-[#665f59] dark:text-gray-300 sm:grid-cols-2">
                              <p className="flex items-center gap-2">
                                <CalendarDays
                                  size={15}
                                  className="text-[#fb7563ea]"
                                />
                                Request: {request.requestDate}
                              </p>
                              <p className="flex items-center gap-2">
                                <CheckCircle2
                                  size={15}
                                  className="text-[#fb7563ea]"
                                />
                                Pickup: {request.pickupDate}
                              </p>
                            </div>
                            {request.message && (
                              <p className="mt-3 flex gap-2 rounded-xl bg-[#efe8d470] p-3 text-sm leading-6 text-[#3f434d] dark:bg-[#262220] dark:text-gray-200">
                                <MessageSquareText
                                  size={15}
                                  className="mt-1 shrink-0 text-[#fb7563ea]"
                                />
                                {request.message}
                              </p>
                            )}
                            {!isApproved && !isRejected && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                <Button
                                  type="button"
                                  disabled={isPetAdopted || isApproving}
                                  onClick={() => handleApprove(request)}
                                  className="h-9 rounded-full bg-[#20b97b] px-4 text-xs font-black text-white transition hover:bg-[#1aa66d] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {isApproving ? "Approving..." : "Approve"}
                                </Button>
                                <Button
                                  type="button"
                                  disabled={isRejecting}
                                  onClick={() => handleReject(request)}
                                  className="h-9 rounded-full bg-[#fb7563ea] px-4 text-xs font-black text-white transition hover:bg-[#f95f49] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {isRejecting ? "Rejecting..." : "Reject"}
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  ))}
                </div>
              )}
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                slot="close"
                className="rounded-full border border-[#d6cbc6] bg-white px-5 text-sm font-black text-[#2e2804] transition hover:bg-[#fb756314] dark:border-[#4b5563] dark:bg-transparent dark:text-white"
              >
                Close
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default ListingRequestsButton;
