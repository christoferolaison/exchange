import type { IslandData } from "./types";

export default function Boat({
  data,
  durationMs,
}: {
  data: IslandData;
  durationMs: number;
}) {
  return (
    <div
      className="boat-sail absolute top-1/2 -translate-y-1/2 left-0 right-[260px] flex items-center pointer-events-none"
      style={{ animationDuration: `${durationMs}ms` }}
    >
      <div className="relative w-full flex items-center">
        <div className="boat-bob relative">
          {/* boat svg */}
          <svg
            width="120"
            height="100"
            viewBox="0 0 120 100"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_6px_8px_rgba(0,0,0,0.35)]"
          >
            {/* mast */}
            <line
              x1="60"
              y1="80"
              x2="60"
              y2="14"
              stroke="#5b3a18"
              strokeWidth="3"
            />
            {/* sail */}
            <path
              d="M 62 18 Q 100 38 62 70 Z"
              fill="#fffaf0"
              stroke="#1f2937"
              strokeWidth="1.5"
            />
            <path
              d="M 58 24 Q 32 46 58 66 Z"
              fill="#f4c542"
              stroke="#1f2937"
              strokeWidth="1.5"
            />
            {/* hull */}
            <path
              d="M 12 78 L 108 78 L 96 96 L 24 96 Z"
              fill="#6b3e15"
              stroke="#2a1707"
              strokeWidth="2"
            />
            {/* flag */}
            <path
              d="M 60 14 L 78 18 L 60 22 Z"
              fill="#e23636"
              stroke="#1f2937"
              strokeWidth="1"
            />
          </svg>
          {/* wake */}
          <div className="absolute -bottom-1 left-0 w-24 h-2 overflow-hidden">
            <span className="wake absolute left-16 top-0 h-2 w-2 rounded-full bg-white/70" />
            <span
              className="wake absolute left-20 top-1 h-1.5 w-1.5 rounded-full bg-white/60"
              style={{ animationDelay: "0.4s" }}
            />
            <span
              className="wake absolute left-12 top-0 h-1.5 w-1.5 rounded-full bg-white/50"
              style={{ animationDelay: "0.8s" }}
            />
          </div>
        </div>

        {/* the cargo: props as a scroll */}
        <div className="ml-3 rounded-lg bg-amber-50/95 ring-2 ring-amber-900/40 shadow-lg px-3 py-2 font-mono text-[11px] leading-snug text-amber-950 max-w-[220px]">
          <p className="text-[9px] uppercase tracking-widest text-amber-900/70 font-bold mb-1">
            Cargo (props)
          </p>
          <p>
            <span className="text-amber-700">name:</span>{" "}
            <span className="font-semibold">&quot;{data.name}&quot;</span>
          </p>
          <p>
            <span className="text-amber-700">population:</span>{" "}
            <span className="font-semibold">
              {data.population.toLocaleString()}
            </span>
          </p>
          <p>
            <span className="text-amber-700">status:</span>{" "}
            <span className="font-semibold">&quot;{data.status}&quot;</span>
          </p>
        </div>
      </div>
    </div>
  );
}
