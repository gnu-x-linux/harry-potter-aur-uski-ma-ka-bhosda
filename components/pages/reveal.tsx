"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const PHOTOS = Array.from({ length: 19 }).map(
  (_, i) => `/pictures/photo${i + 1}.jpg`,
);

export default function RevealPage() {
  const router = useRouter();

  const [fadeIn, setFadeIn] = useState(false);
  const [animatePhotos, setAnimatePhotos] = useState(false);
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    const timer = setTimeout(() => setAnimatePhotos(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const photosMeta = useMemo(
    () =>
      PHOTOS.map(() => {
        const side = Math.floor(Math.random() * 4);
        const offset = Math.random() * 60 + 10;
        const size = Math.random() * 60 + 90;
        const rotation = Math.random() * 40 - 20;

        const start = {};
        if (side === 0)
          Object.assign(start, { top: -size, left: `${offset}%` });
        if (side === 1)
          Object.assign(start, { right: -size, top: `${offset}%` });
        if (side === 2)
          Object.assign(start, { bottom: -size, left: `${offset}%` });
        if (side === 3)
          Object.assign(start, { left: -size, top: `${offset}%` });

        return {
          size,
          rotation,
          start,
          final: {
            left: `${Math.random() * 70 + 15}%`,
            top: `${Math.random() * 60 + 20}%`,
          },
        };
      }),
    [],
  );

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => router.push("/letter"), 1200);
  };

  return (
    <div
      className={`
        relative w-screen h-screen overflow-hidden
        bg-pink-200 flex items-center justify-center
        transition-opacity duration-700
        ${fadeIn && !clicked ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* Floating heart */}
      {clicked && (
        <div
          className="
            absolute z-30 text-7xl
            animate-heart-float
          "
        >
          💖
        </div>
      )}

      {/* Button */}
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleClick}
        disabled={clicked}
        className={`
          z-20 relative px-12 py-6 rounded-full
          text-pink-600 text-4xl font-bold
          bg-gradient-to-br from-white via-pink-100 to-pink-200
          shadow-[0_20px_40px_rgba(236,72,153,0.35),inset_0_2px_6px_rgba(255,255,255,0.9)]
          transition-all duration-300
          ${hover ? "scale-110 shadow-[0_30px_60px_rgba(236,72,153,0.5)]" : ""}
          animate-soft-pulse
        `}
      >
        Happy Birthday 💕
      </button>

      {/* Photos */}
      {PHOTOS.map((src, i) => {
        const meta = photosMeta[i];
        const repelX = hover ? Math.random() * 80 - 40 : 0;
        const repelY = hover ? Math.random() * 80 - 40 : 0;

        return (
          <Image
            key={i}
            src={src}
            alt=""
            width={meta.size * 3}
            height={meta.size * 3}
            className="absolute shadow-2xl transition-all duration-700 ease-out"
            style={{
              zIndex: 5,
              background: "white",
              padding: "10px 10px 28px",
              borderRadius: "4px",
              ...(!animatePhotos ? meta.start : meta.final),
              transform: `
                translate(-50%, -50%)
                rotate(${meta.rotation}deg)
                translate(${repelX}px, ${repelY}px)
              `,
            }}
          />
        );
      })}
    </div>
  );
}
