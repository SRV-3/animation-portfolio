"use client";

import InfiniteCarousal from "@/components/InfiniteCarousal";
import { projects } from "@/data/project";
import useViewTransition from "@/hooks/useViewTransition";
import Loctaion from "@/components/Loctaion";

export default function Home() {
  useViewTransition();
  return (
    <main className="h-screen flex flex-col justify-center w-full">
      <InfiniteCarousal projects={projects} />
      <Loctaion />
    </main>
  );
}
