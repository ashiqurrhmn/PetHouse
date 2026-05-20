import { Eye } from "lucide-react";
import Link from "next/link";

const ListingViewButton = ({ petId }) => (
  <Link
    href={`/all-pets/${petId}`}
    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-[#d6cbc6] bg-white px-3 text-xs font-black text-[#2e2804] transition hover:border-[#fb756380] dark:border-[#4b5563] dark:bg-transparent dark:text-[#f8f4ea]"
  >
    <Eye size={15} />
    View
  </Link>
);

export default ListingViewButton;
