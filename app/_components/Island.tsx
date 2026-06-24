"use client";

import { useState } from "react";
import type { IslandData } from "./types";

const STATUS_BADGE: Record<IslandData["status"], string> = {
  thriving: "bg-emerald-200 text-emerald-900 ring-emerald-600/40",
  sleepy: "bg-indigo-200 text-indigo-900 ring-indigo-600/40",
  busy: "bg-orange-200 text-orange-900 ring-orange-600/40",
  wild: "bg-fuchsia-200 text-fuchsia-900 ring-fuchsia-600/40",
};

export default function Island({ data }: { data: IslandData }) {
  const [lanternsLit, setLanternsLit] = useState(false);
  const [visitors, setVisitors] = useState(0);
  const [hover, setHover] = useState(false);

  return (
    <div
      className="island-surface relative w-[260px] shrink-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* tag: this is a client component */}
      <div className="absolute -top-3 left-3 z-10 rounded-full bg-fuchsia-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 ring-2 ring-white shadow">
        &apos;use client&apos;
      </div>

      {/* The island body */}
      <div
        className={`relative rounded-3xl p-4 pt-6 shadow-2xl transition-transform duration-300 ${
          hover ? "translate-y-[-4px]" : ""
        }`}
        style={{
          background: `linear-gradient(160deg, var(--island-grass-light) 0%, var(--island-grass) 60%, var(--sand-deep) 100%)`,
          boxShadow:
            "0 12px 28px rgba(0,0,0,0.35), inset 0 -10px 18px rgba(0,0,0,0.18)",
        }}
      >
        {/* palm-ish decoration */}
        <div className="absolute -top-5 right-4 text-4xl drop-shadow-md select-none">
          {data.emoji}
        </div>

        {/* lit lanterns */}
        {lanternsLit && (
          <>
            <span className="absolute top-2 left-3 h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_12px_4px_rgba(253,224,71,0.7)]" />
            <span className="absolute top-2 left-10 h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_12px_4px_rgba(253,224,71,0.7)]" />
            <span className="absolute top-2 left-17 h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_12px_4px_rgba(253,224,71,0.7)]" />
          </>
        )}

        <h3 className="text-xl font-black tracking-tight text-emerald-50 drop-shadow-sm">
          {data.name}
        </h3>

        {/* Prop readout (what the boat brought) */}
        <dl className="mt-2 rounded-lg bg-emerald-950/40 backdrop-blur-sm px-3 py-2 font-mono text-[11px] text-emerald-50 space-y-0.5">
          <div className="flex justify-between">
            <dt className="text-emerald-200/80">population</dt>
            <dd className="font-bold">{data.population.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-emerald-200/80">status</dt>
            <dd>
              <span
                className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ring-1 ${
                  STATUS_BADGE[data.status]
                }`}
              >
                {data.status}
              </span>
            </dd>
          </div>
        </dl>

        {/* Interactive bits */}
        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={() => setLanternsLit((v) => !v)}
            className="w-full rounded-md bg-amber-100 hover:bg-amber-200 active:bg-amber-300 text-amber-950 text-xs font-bold py-1.5 ring-1 ring-amber-900/30 transition-colors"
          >
            {lanternsLit ? "🌒 Douse lanterns" : "🌕 Light lanterns"}
          </button>

          <div className="flex items-center justify-between rounded-md bg-emerald-50/90 px-2 py-1 ring-1 ring-emerald-900/20">
            <button
              type="button"
              onClick={() => setVisitors((v) => Math.max(0, v - 1))}
              className="h-6 w-6 rounded bg-emerald-700 text-white text-sm leading-none hover:bg-emerald-800"
              aria-label="fewer visitors"
            >
              −
            </button>
            <span className="text-[11px] font-mono text-emerald-950">
              <span className="font-bold">{visitors}</span> visitors today
            </span>
            <button
              type="button"
              onClick={() => setVisitors((v) => v + 1)}
              className="h-6 w-6 rounded bg-emerald-700 text-white text-sm leading-none hover:bg-emerald-800"
              aria-label="more visitors"
            >
              +
            </button>
          </div>

          <p className="text-[10px] text-emerald-100/90 italic text-center">
            {hover ? "🪶 the breeze stirs the palms…" : "hover to feel the wind"}
          </p>
        </div>
      </div>

      {/* island base (under the water) */}
      <div
        className="absolute -bottom-2 left-4 right-4 h-3 rounded-b-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0))",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}
