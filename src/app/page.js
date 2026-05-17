import AdoptionJourney from "@/components/AdoptionJourney";
import Banner from "@/components/Banner";
import MeetPets from "@/components/MeetPets";
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
      <MeetPets />
      <AdoptionJourney />
    </div>
  );
}
