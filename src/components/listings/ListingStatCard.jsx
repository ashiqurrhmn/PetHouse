const ListingStatCard = ({ label, value, tone }) => (
  <div className="rounded-2xl border border-[#fb756326] bg-white p-5 shadow-sm dark:border-[#fb75634d] dark:bg-[#181818]">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#776d67] dark:text-gray-400">
      {label}
    </p>
    <p className={`mt-3 text-4xl font-black ${tone}`}>{value}</p>
  </div>
);

export default ListingStatCard;
