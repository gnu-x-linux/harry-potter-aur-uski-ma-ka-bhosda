"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Caveat } from "next/font/google";

const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function LetterPage() {
  const router = useRouter();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div
      className={`
        min-h-screen w-full
        bg-white
        transition-opacity duration-700
        ${fadeIn ? "opacity-100" : "opacity-0"}
        flex flex-col items-center justify-center
        relative
      `}
    >
      {/* Letter */}
      <div
        className={`
          max-w-3xl w-full mx-6
          bg-[url('/paper-texture.png')] bg-cover
          rounded-lg
          shadow-2xl
          p-10 md:p-14
          text-gray-700
          ${handwriting.className}
          text-xl md:text-2xl
          leading-relaxed
          rounded-3xl
          bg-yellow-50
        `}
      >
        <p>
          happy birthday rutva!!!🕺🏻🎉 <br />
          I love every moment I spent with you , I can't beleive hme itna time
          ho gya baat karte hue😞
          <br />
          <br />
          It's been more than a year ig😭
          <br />
          <br />
          I hope apko meri website achi lagi hogi , ab mai itna bhi kuch khas
          nahi🫵🏻😡 khaas to aap ho😋😘 , rutva khant supremacy
          <br />
          <br />
          😞Sorry yrr mai kinderjoy nahi de paya mere bank account me 800 rupay
          the vo bhi minimum limit se kam the to bank ne le liye ab -220 rupay
          hai😭💔
          <br />
          <br />
          Nvm
          <br />
          <br />
          ENJOY YOUR DAY GIRL!!!! LOTS OF LOVE FROM THIS HARYANVI GUY🫵🏻😡
          <br />
          <br />
          once again....
          <br />
          <br />
          HAPPPY WALAAA BIRTHDAY RUTVAAAAAAA
          <br />
          <br />
          🕺🏻🕺🏻BABY TERE BDAY PE RANDI NACHVAVEGE.....
        </p>
      </div>
    </div>
  );
}
