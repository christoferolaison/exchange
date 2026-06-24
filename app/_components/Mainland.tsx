export default function Mainland() {
  return (
    <aside className="sand-bg relative h-full w-full px-6 py-8 flex flex-col gap-6 border-r-4 border-amber-900/40 shadow-[8px_0_24px_rgba(0,0,0,0.2)]">
      <header className="relative z-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-900/70 font-semibold">
          Server Component
        </p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-amber-950 leading-none">
          The Mainland
        </h1>
        <p className="mt-2 text-sm text-amber-950/80 leading-snug">
          Where data is harvested, secrets are kept, and the kingdom&apos;s tale
          begins.
        </p>
      </header>

      <section className="relative z-10 rounded-xl bg-amber-50/70 ring-1 ring-amber-900/20 p-4">
        <p className="text-xs uppercase tracking-widest text-amber-900/70 font-bold">
          Harbor manifest
        </p>
        <ul className="mt-3 space-y-2 text-sm text-amber-950">
          <li className="flex items-center gap-2">
            <span aria-hidden>⚒️</span>
            <span>
              <code className="font-mono text-xs bg-amber-100 px-1 rounded">name</code>
              <span className="text-amber-950/70 ml-1">— each isle&apos;s title</span>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden>📜</span>
            <span>
              <code className="font-mono text-xs bg-amber-100 px-1 rounded">population</code>
              <span className="text-amber-950/70 ml-1">— souls aboard</span>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden>🚩</span>
            <span>
              <code className="font-mono text-xs bg-amber-100 px-1 rounded">status</code>
              <span className="text-amber-950/70 ml-1">— mood of the realm</span>
            </span>
          </li>
        </ul>
      </section>

      <section className="relative z-10 rounded-xl bg-amber-950/85 text-amber-50 p-4 font-mono text-[11px] leading-relaxed shadow-inner">
        <p className="text-amber-200 mb-1">{"// app/page.tsx"}</p>
        <p>
          <span className="text-amber-300">async function</span>{" "}
          <span className="text-amber-100">fetch()</span>{" "}
          <span className="text-amber-400">{`{`}</span>
        </p>
        <p className="pl-3">
          <span className="text-amber-300">await</span> delay(...)
        </p>
        <p>
          <span className="text-amber-400">{`}`}</span>
        </p>
        <p className="mt-2 text-amber-200/80">
          ↳ no JS shipped from here
        </p>
      </section>

      <footer className="relative z-10 mt-auto text-[11px] text-amber-950/70 font-mono">
        <p>
          Static shell sent <span className="text-amber-950 font-bold">first</span>.
        </p>
        <p>Islands stream in as their data resolves.</p>
      </footer>
    </aside>
  );
}
