import { Card } from "./ui/card";
import { Comic_Relief } from "next/font/google";

const comic = Comic_Relief({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-comic",
});

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <Card
        className="
          w-40 h-40
          grid place-items-center
          text-8xl font-mono font-semibold
          leading-none tabular-nums
          text-pink-300
          rounded-2xl
          bg-gradient-to-br from-pink-50/80 to-purple-50/40
          border-pink-50/80
        "
      >
        {String(value).padStart(2, "0")}
      </Card>

      <span className="mt-2 text-[10px] uppercase tracking-widest text-foreground/70">
        {label}
      </span>
    </div>
  );
}

export default function HeroTimer({ days, hours, minutes, seconds }) {
  return (
    <div
      className={`
        ${comic.variable}
        flex flex-col items-center justify-center gap-6 text-center
      `}
    >
      <p
        className={`
            ${comic.className}
            text-5xl md:text-6xl
            font-bold
            tracking-tight
            text-white
            leading-snug
            max-w-3xl
          `}
      >
        Counting down to{" "}
        <p className="text-pink-500 text-3xl">something special 💖</p>
      </p>

      <div className="flex items-end gap-3">
        <TimeBox value={days} label="Days" />
        <TimeBox value={hours} label="Hours" />
        <TimeBox value={minutes} label="Minutes" />
        <TimeBox value={seconds} label="Seconds" />
      </div>
    </div>
  );
}
