import OpeningAnimation from "@/components/OpeningAnimation";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Countdown from "@/components/Countdown";
import WeddingDetails from "@/components/WeddingDetails";
import Venue from "@/components/Venue";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import GiftRegistry from "@/components/GiftRegistry";
import Accommodation from "@/components/Accommodation";
import FinalScene from "@/components/FinalScene";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <OpeningAnimation />
      <Navigation />
      <Hero />
      <Story />
      <Countdown />
      <WeddingDetails />
      <Venue />
      <Gallery />
      <RSVPForm />
      <GiftRegistry />
      <Accommodation />
      <FinalScene />
      <Footer />
    </main>
  );
}
