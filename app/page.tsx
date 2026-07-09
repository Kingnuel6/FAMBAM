import EnvelopeLanding from "@/components/EnvelopeLanding";
import Welcome from "@/components/Welcome";
import EventDetails from "@/components/EventDetails";
import Countdown from "@/components/Countdown";
import RSVPForm from "@/components/RSVPForm";
import AsoEbiGifts from "@/components/AsoEbiGifts";
import FinalScene from "@/components/FinalScene";

export default function Home() {
  return (
    <main>
      <EnvelopeLanding />
      <Welcome />
      <EventDetails />
      <Countdown />
      <RSVPForm />
      <AsoEbiGifts />
      <FinalScene />
    </main>
  );
}
