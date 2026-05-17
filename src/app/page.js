import Banner from "@/components/Banner";
import PetCareTips from "@/components/PetCareTips";
import SuccessStories from "@/components/SuccessStories";
import WhyAdopt from "@/components/WhyAdopt";

export default function Home() {
  return (
    <div>
      <Banner />
      <WhyAdopt />
      <SuccessStories />
      <PetCareTips />
    </div>
  );
}
