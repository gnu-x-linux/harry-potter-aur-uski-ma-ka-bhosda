"use client";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import calculateTimeLeft from "@/utils/Countdown";
import HeroTimer from "../Hero";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="bg-pink-200 min-h-screen flex items-center justify-center">
      <Head></Head>

      <HeroTimer
        days={timeLeft.days}
        hours={timeLeft.hours}
        minutes={timeLeft.minutes}
        seconds={timeLeft.seconds}
      />
    </div>
  );
};

export default Countdown;
