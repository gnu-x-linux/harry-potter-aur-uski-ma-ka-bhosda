"use client";

import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import calculateTimeLeft from "@/utils/Countdown";
import HeroTimer from "../Hero";
import { Heart } from "lucide-react";
import Image from "next/image";

const BALLOON_COUNT = Math.floor(Math.random() * (350 - 250) + 250);
const CONFETTI_COUNT = 50;

const Countdown = () => {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [finished, setFinished] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [effects, setEffects] = useState([]);

  useEffect(() => {
    const timerId = setInterval(() => {
      const next = calculateTimeLeft();
      setTimeLeft(next);

      if (
        next.days === 0 &&
        next.hours === 0 &&
        next.minutes === 0 &&
        next.seconds === 0
      ) {
        setFinished(true);
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleClick = () => {
    const nextClicks = clicks + 1;
    setClicks(nextClicks);

    // spawn effects
    const spawn = Date.now();
    setEffects((prev) => [...prev, spawn]);

    if (nextClicks >= 3) {
      setTimeout(() => router.push("/face"), 1200);
    }
  };

  const remaining = Math.max(0, 3 - clicks);

  return (
    <div className="relative overflow-hidden bg-pink-200 min-h-screen flex flex-col items-center justify-center gap-8">
      <Head />

      <HeroTimer
        days={timeLeft.days}
        hours={timeLeft.hours}
        minutes={timeLeft.minutes}
        seconds={timeLeft.seconds}
      />

      {finished && (
        <button
          onClick={handleClick}
          className="
          flex gap-2
            z-10
            px-10 py-4
            rounded-full
            bg-pink-400 hover:bg-pink-500
            text-white font-semibold
            text-lg
            transition-all
            shadow-xl
            active:scale-95
          "
        >
          {remaining === 0
            ? "Go 💖"
            : remaining === 1
              ? "Click once more 💕"
              : remaining === 2
                ? `Click ${remaining} more times 💞`
                : "click me "}
          {remaining === 3 ? <Heart fill="pink" stroke="pink" /> : ""}
        </button>
      )}

      {/* Balloons + Confetti */}
      {effects.map((id) => (
        <React.Fragment key={id}>
          {Array.from({ length: BALLOON_COUNT }).map((_, i) => {
            const size = Math.random() * 40 + 40; // 40px – 80px
            const hue = Math.random() * 360;
            const drift = (Math.random() - 0.5) * 120;

            return (
              <Image
                unoptimized
                alt="ballon"
                width={45}
                height={45}
                key={`b-${i}`}
                src="/balloon.png"
                className="balloon"
                style={{
                  left: `${Math.random() * 100}%`,
                  width: `${size}px`,
                  animationDelay: `${Math.random() * 1.5}s`,
                  "--drift": `${drift}px`,
                  filter: `
                    hue-rotate(${hue}deg)
                    saturate(1.2)
                    brightness(1.05)
                  `,
                }}
              />
            );
          })}

          {Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
            const isEmoji = Math.random() > 0.6;
            const emoji = Math.random() > 0.5 ? "❤️" : "🎂";
            const size = Math.random() * 14 + 8; // 8px – 22px
            const drift = (Math.random() - 0.5) * 120; // horizontal drift
            const hue = Math.random() * 360;

            return isEmoji ? (
              <span
                key={`e-${i}`}
                className="floating-emoji"
                style={{
                  left: `${Math.random() * 100}%`,
                  fontSize: `${size}px`,
                  "--drift": `${drift}px`,
                  filter: `hue-rotate(${hue}deg)`,
                  animationDelay: `${Math.random() * 1.5}s`,
                }}
              >
                {emoji}
              </span>
            ) : (
              <span
                key={`c-${i}`}
                className="floating-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  width: `${size}px`,
                  height: `${size * 1.4}px`,
                  "--drift": `${drift}px`,
                  filter: `hue-rotate(${hue}deg)`,
                  animationDelay: `${Math.random() * 1.5}s`,
                }}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Countdown;
