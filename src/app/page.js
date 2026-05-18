import AdoptionJourney from "@/components/AdoptionJourney";
import Banner from "@/components/Banner";
import FeaturedPets from "@/components/FeaturedPets";
import MeetPets from "@/components/MeetPets";
import PetCareTips from "@/components/PetCareTips";
import SuccessStories from "@/components/SuccessStories";
import WhyAdopt from "@/components/WhyAdopt";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedPets />
      <WhyAdopt />
      <SuccessStories />
      <PetCareTips />
      <MeetPets />
      <AdoptionJourney />
    </div>
  );
}
