import GateIntro from "@/components/GateIntro";
import Welcome from "@/components/Welcome";
import Gallery from "@/components/Gallery";
import EventDetails from "@/components/EventDetails";
import Countdown from "@/components/Countdown";
import RSVPForm from "@/components/RSVPForm";
import AsoEbiGifts from "@/components/AsoEbiGifts";
import FinalScene from "@/components/FinalScene";

export default function Home() {
  return (
    <main>
      <GateIntro />
      <Welcome />
      <Gallery />
      <EventDetails />
      <Countdown />
      <RSVPForm />
      <AsoEbiGifts />
      <FinalScene />
    </main>
  );
}
