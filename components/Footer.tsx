import { wedding } from "@/config/wedding";

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-ivory px-6 py-10 text-center">
      <p className="font-script text-2xl text-gold">{wedding.monogram}</p>
      <p className="mt-2 font-body text-xs uppercase tracking-[0.3em] text-charcoal/50">
        {wedding.hashtag} · {wedding.dates.display}
      </p>
    </footer>
  );
}
