export default function Legend() {
  const rows: Array<{ icon: string; label: string; meaning: string }> = [
    { icon: "🏰", label: "Mainland", meaning: "Server components" },
    { icon: "🌊", label: "Sea", meaning: "The HTTP stream" },
    { icon: "🏝️", label: "Islands", meaning: "'use client' components" },
    { icon: "⛵", label: "Boats", meaning: "Props server → client" },
    { icon: "🌫️", label: "Fog", meaning: "<Suspense> fallback" },
  ];

  return (
    <div className="absolute bottom-4 right-4 z-30 rounded-2xl bg-amber-50/95 ring-2 ring-amber-900/40 shadow-2xl px-4 py-3 backdrop-blur">
      <p className="text-[10px] uppercase tracking-[0.3em] text-amber-900/70 font-bold mb-2">
        Cartographer&apos;s Legend
      </p>
      <ul className="space-y-1.5 text-sm text-amber-950">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-2">
            <span className="text-lg leading-none" aria-hidden>
              {r.icon}
            </span>
            <span className="font-bold w-20">{r.label}</span>
            <span className="text-amber-950/80 font-mono text-xs">
              {r.meaning}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
