import Countdown from "@/components/pages/home";
import Image from "next/image";

export default function Home() {
  return (
    <div className="select-none">
      <Countdown />
      <div className="uppercase text-lg bottom-0 fixed flex w-screen items-end justify-end text-stone-600 opacity-70">
        Made by Apurv Sikka
      </div>
    </div>
  );
}
