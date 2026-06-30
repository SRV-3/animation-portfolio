"use client";

import InfiniteCarousal from "@/components/InfiniteCarousal";
import { projects } from "@/data/project";

export default function Home() {
  return (
    <main className="h-screen flex items-center w-full">
      <InfiniteCarousal projects={projects} />
    </main>
  );
}
