"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Caveat } from "next/font/google";

const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function EnvelopePage() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    setTimeout(() => {
      router.push("/reveal");
    }, 1500);
  };

  return (
    <div
      className={`container ${opened ? "opened-bg" : ""} min-h-screen min-w-screen`}
    >
      <div
        className={`envelope-wrapper ${opened ? "opened" : ""}`}
        onClick={handleOpen}
      >
        <div className="wrapper">
          <div className="lid one" />
          <div className="lid two" />
          <div className="envelope" />
          <div className="letter">
            <p className={`${handwriting.className}`}>Click Me</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          background: #fbcfe8;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: background 0.6s ease;
        }

        .opened-bg {
          background: white;
        }

        .envelope-wrapper {
          cursor: pointer;
          transition:
            transform 1.5s ease,
            opacity 1.2s ease;
        }

        .envelope-wrapper.opened {
          transform: scale(8) translateY(-50px);
          opacity: 0;
        }

        .wrapper {
          background: blue;
          height: 200px;
          width: 300px;
          position: relative;
          display: flex;
          justify-content: center;
          z-index: 0;
        }

        .lid {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          border-right: 150px solid transparent;
          // border-bottom: 100px solid transparent;
          border-left: 150px solid transparent;
          transform-origin: top;
          transition: transform 0.4s ease;
        }

        .lid.one {
          border-top: 100px solid #f9a8d4;
          z-index: 3;
        }

        .lid.two {
          border-top: 100px solid #f472b6;
          transform: rotateX(90deg);
          z-index: 1;
          // background:;
        }

        .envelope {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          border-top: 100px solid transparent;
          border-right: 150px solid #fbcf68;
          border-bottom: 100px solid #c0cc08;
          border-left: 150px solid #f9a8d4;
          z-index: 2;
        }

        .letter {
          position: absolute;
          top: 10px;
          width: 80%;
          height: 80%;
          background: white;
          border-radius: 12px;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          transition: transform 0.5s ease;
        }

        .wrapper:hover .lid.one {
          transform: rotateX(90deg);
        }

        .wrapper:hover .lid.two {
          transform: rotateX(180deg);
        }

        .wrapper:hover .letter {
          transform: translateY(-50px);
        }
      `}</style>
    </div>
  );
}
