"use client";
import CarousalCard from "@/components/CarousalCard";
import InfiniteCarousal from "@/components/InfiniteCarousal";
import TextReveal from "@/components/TextReveal";
import { projects } from "@/data/project";
import { useRef } from "react";

export default function Home() {
  const triggerRef = useRef(null);

  const handleHoverEnter = () => {
    triggerRef?.current.play();
  };

  const handleHoverLeave = () => {
    triggerRef?.current.reverse();
  };

  return (
    <main className="h-[100vh] flex items-center w-full">
      {/* <div
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
        className="h-[8rem] w-[12rem] bg-red-400"
      ></div>
      <TextReveal
        ref={triggerRef}
        splitBy="chars"
        trigger="manual"
        className="text-[10rem]"
      >
        WhatsUp !
      </TextReveal> */}

      <InfiniteCarousal projects={projects} />
    </main>
  );
}
