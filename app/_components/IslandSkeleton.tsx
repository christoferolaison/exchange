export default function IslandSkeleton({
  name,
  delayMs,
}: {
  name: string;
  delayMs: number;
}) {
  return (
    <div className="relative flex items-center h-[180px]">
      <div className="absolute inset-0 fog-band opacity-60 pointer-events-none rounded-2xl" />
      <div className="relative w-full flex items-center justify-end pr-2">
        <div className="fog w-[260px] rounded-3xl bg-white/15 ring-1 ring-white/30 backdrop-blur-sm p-4 pt-6 text-white/90">
          <div className="text-[10px] uppercase tracking-widest font-bold text-white/70">
            inbound
          </div>
          <div className="mt-1 text-lg font-black tracking-tight">
            {name}…
          </div>
          <div className="mt-2 font-mono text-[11px] space-y-1">
            <div className="h-2 w-3/4 rounded bg-white/30" />
            <div className="h-2 w-1/2 rounded bg-white/30" />
            <div className="h-2 w-2/3 rounded bg-white/30" />
          </div>
          <div className="mt-3 text-[10px] text-white/80 font-mono">
            ⏳ Suspense fallback · awaiting {delayMs} ms
          </div>
        </div>
      </div>
    </div>
  );
}
