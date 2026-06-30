"use client";

import InfiniteCarousal from "@/components/InfiniteCarousal";
import { projects } from "@/data/project";
import useViewTransition from "@/hooks/useViewTransition";

export default function Home() {
  useViewTransition();
  return (
    <main className="h-screen flex items-center w-full">
      <InfiniteCarousal projects={projects} />
    </main>
  );
}
