"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function ReplayButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      setElapsed(performance.now() - start);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  // Stop the timer once everything has streamed (~3.2s).
  useEffect(() => {
    const t = setTimeout(() => setRunning(false), 3300);
    return () => clearTimeout(t);
  }, []);

  const seconds = (elapsed / 1000).toFixed(2);

  return (
    <div className="flex items-center gap-3">
      <div className="rounded-md bg-amber-950/85 text-amber-50 px-3 py-1.5 font-mono text-xs ring-1 ring-amber-200/30 shadow">
        <span className="text-amber-300">t</span>={seconds}s
        {running ? (
          <span className="ml-1 text-amber-300 animate-pulse">●</span>
        ) : (
          <span className="ml-1 text-emerald-300">✓</span>
        )}
      </div>
      <button
        type="button"
        onClick={() =>
          startTransition(() => {
            setElapsed(0);
            setRunning(true);
            router.refresh();
            setTimeout(() => setRunning(false), 3300);
          })
        }
        disabled={isPending}
        className="rounded-md bg-amber-100 hover:bg-amber-200 disabled:opacity-60 text-amber-950 text-xs font-bold px-3 py-1.5 ring-1 ring-amber-900/30 shadow"
      >
        {isPending ? "Streaming…" : "↻ Replay stream"}
      </button>
    </div>
  );
}
