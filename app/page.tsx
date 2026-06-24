import { Suspense } from "react";
import Mainland from "./_components/Mainland";
import IslandHarbor from "./_components/IslandHarbor";
import IslandSkeleton from "./_components/IslandSkeleton";
import Legend from "./_components/Legend";
import ReplayButton from "./_components/ReplayButton";
import type { IslandData } from "./_components/types";

export const dynamic = "force-dynamic";

const ISLANDS: Array<{ data: IslandData; delayMs: number }> = [
  {
    data: {
      name: "Codeshire",
      population: 1_240,
      status: "thriving",
      emoji: "🏝️",
    },
    delayMs: 1000,
  },
  {
    data: {
      name: "Stately Isle",
      population: 542,
      status: "sleepy",
      emoji: "🌴",
    },
    delayMs: 2000,
  },
  {
    data: {
      name: "Hovermoor",
      population: 3_781,
      status: "busy",
      emoji: "⛰️",
    },
    delayMs: 3000,
  },
];

export default function StreamingKingdomDemo() {
  return (
    <main className="relative h-screen w-screen overflow-hidden flex">
      {/* MAINLAND (Server) */}
      <div className="relative w-[320px] shrink-0 z-20">
        <Mainland />
      </div>

      {/* SEA (Server, with islands floating in it) */}
      <section className="relative flex-1 sea-bg overflow-hidden">
        <div className="sea-shimmer" />

        {/* Top banner */}
        <div className="absolute top-4 left-6 right-6 z-20 flex items-start justify-between gap-6">
          <div className="rounded-xl bg-white/85 ring-2 ring-white/60 shadow-xl px-4 py-2 backdrop-blur">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-sky-900/80">
              The Sea
            </p>
            <p className="text-2xl font-black tracking-tight text-sky-950 leading-none">
              Streaming HTTP Response
            </p>
            <p className="text-[11px] text-sky-900/80 mt-1 font-mono">
              chunks flow → as each <code>&lt;Suspense&gt;</code> resolves
            </p>
          </div>

          <ReplayButton />
        </div>

        {/* The fleet of suspense boundaries, each its own stream */}
        <div className="absolute inset-0 pt-28 pb-20 pl-6 pr-2 flex flex-col gap-4 justify-center z-10">
          {ISLANDS.map(({ data, delayMs }) => (
            <Suspense
              key={data.name}
              fallback={<IslandSkeleton name={data.name} delayMs={delayMs} />}
            >
              <IslandHarbor data={data} delayMs={delayMs} />
            </Suspense>
          ))}
        </div>

        {/* Sky / horizon overlay */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-200/40 to-transparent pointer-events-none z-0" />
      </section>

      <Legend />
    </main>
  );
}
