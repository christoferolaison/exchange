import type { Metadata } from "next";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { ClientRecommendations } from "./client-recommendations";
import { DelayControls } from "./delay-controls";
import { DEFAULT_DELAYS, DELAY_FIELDS } from "./delays";
import type { DelayConfig, DelayKey } from "./delays";

export const metadata: Metadata = {
  title: "Rendering Lab",
  description: "Explore Next.js rendering techniques with mock delays.",
};

export const unstable_instant = {
  prefetch: "static",
  samples: [
    {
      searchParams: {
        pulse: null,
        trends: null,
        profile: null,
        deep: null,
        client: null,
      },
    },
  ],
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type RenderingLabPageProps = {
  searchParams: SearchParams;
};

type Recommendation = {
  id: string;
  title: string;
  confidence: number;
  reason: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clampDelay(value: string | string[] | undefined, key: DelayKey) {
  const field = DELAY_FIELDS.find((candidate) => candidate.key === key);
  const fallback = DEFAULT_DELAYS[key];
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (!field || !rawValue) {
    return fallback;
  }

  const parsed = Number(rawValue);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  const stepped = Math.round(parsed / field.stepMs) * field.stepMs;

  return Math.min(field.maxMs, Math.max(field.minMs, stepped));
}

async function readDelays(searchParams: SearchParams): Promise<DelayConfig> {
  const params = await searchParams;

  return {
    pulse: clampDelay(params.pulse, "pulse"),
    trends: clampDelay(params.trends, "trends"),
    profile: clampDelay(params.profile, "profile"),
    deep: clampDelay(params.deep, "deep"),
    client: clampDelay(params.client, "client"),
  };
}

function formatMs(ms: number) {
  return `${ms.toLocaleString()} ms`;
}

function TechniqueBadge({
  label,
  tone,
}: {
  label: string;
  tone: "static" | "cached" | "streamed" | "client";
}) {
  const tones = {
    static:
      "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
    cached:
      "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200",
    streamed:
      "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-800 dark:border-fuchsia-900 dark:bg-fuchsia-950 dark:text-fuchsia-200",
    client:
      "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {label}
    </span>
  );
}

function ControlsFallback() {
  return (
    <div className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {DELAY_FIELDS.map((field) => (
          <div
            key={field.key}
            className="h-[118px] rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
          />
        ))}
      </div>
      <div className="h-10 w-32 rounded-md bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}

function StreamSkeleton({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <section className="grid min-h-[270px] gap-4 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
          Streaming fallback
        </p>
        <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {detail}
        </p>
      </div>
      <div className="grid gap-3">
        <div className="h-5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </section>
  );
}

function StaticShellOverview() {
  return (
    <section className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <TechniqueBadge label="Static shell" tone="static" />
        <h2 className="mt-3 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
          Immediate shell
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          This copy and every fallback render without waiting for the mock data.
          With Cache Components enabled, that static shell is the PPR result.
        </p>
      </div>
      <div className="grid gap-2 text-sm text-zinc-700 dark:text-zinc-300">
        <div className="flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
          <span>Route</span>
          <span className="font-mono">/rendering-lab</span>
        </div>
        <div className="flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
          <span>PPR switch</span>
          <span className="font-mono">cacheComponents</span>
        </div>
      </div>
    </section>
  );
}

async function CachedSnapshot() {
  "use cache";
  cacheLife("hours");

  await sleep(300);

  const metrics = [
    ["Static shell weight", "Low"],
    ["Cached scope", "Server Component"],
    ["Revalidation profile", "hours"],
  ];

  return (
    <section className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <TechniqueBadge label="use cache" tone="cached" />
        <h2 className="mt-3 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
          Cached server snapshot
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          This async Server Component is cached and can be included in the shell
          instead of streaming on every request.
        </p>
      </div>
      <dl className="grid gap-2 text-sm">
        {metrics.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-900"
          >
            <dt className="text-zinc-600 dark:text-zinc-400">{label}</dt>
            <dd className="font-medium text-zinc-950 dark:text-zinc-50">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

async function MarketPulse({ searchParams }: { searchParams: SearchParams }) {
  const delays = await readDelays(searchParams);
  await sleep(delays.pulse);

  const score = Math.min(96, 74 + Math.round(delays.pulse / 250));
  const signals = [
    ["Search demand", `${score}%`],
    ["New supplier posts", `${12 + Math.round(delays.pulse / 400)}`],
    ["Average spread", `${(2.8 + delays.pulse / 2500).toFixed(1)} pts`],
  ];

  return (
    <section className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <TechniqueBadge label="Server + Suspense" tone="streamed" />
        <h2 className="mt-3 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
          Market pulse
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Resolved after {formatMs(delays.pulse)} in an independent server
          boundary.
        </p>
      </div>
      <dl className="grid gap-2 text-sm">
        {signals.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-900"
          >
            <dt className="text-zinc-600 dark:text-zinc-400">{label}</dt>
            <dd className="font-medium text-zinc-950 dark:text-zinc-50">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

async function TrendTable({ searchParams }: { searchParams: SearchParams }) {
  const delays = await readDelays(searchParams);
  await sleep(delays.trends);

  const rows = [
    ["Battery storage", "Rising", 87],
    ["Grid analytics", "Stable", 73],
    ["Demand response", "Cooling", 61],
  ];

  return (
    <section className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <TechniqueBadge label="Parallel stream" tone="streamed" />
        <h2 className="mt-3 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
          Trend table
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          This sibling boundary resolves after {formatMs(delays.trends)} without
          blocking the market pulse.
        </p>
      </div>
      <div className="grid gap-2 text-sm">
        {rows.map(([name, status, confidence]) => (
          <div
            key={name}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-900"
          >
            <span className="font-medium text-zinc-950 dark:text-zinc-50">
              {name}
            </span>
            <span className="text-zinc-600 dark:text-zinc-400">{status}</span>
            <span className="font-mono text-zinc-700 dark:text-zinc-300">
              {confidence}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

async function loadSegment(label: string, delay: number) {
  await sleep(delay);

  return {
    label,
    delay,
  };
}

async function SequentialRead({ searchParams }: { searchParams: SearchParams }) {
  const delays = await readDelays(searchParams);
  const profile = await loadSegment("Audience profile", delays.profile);
  const deep = await loadSegment("Deep read", delays.deep);
  const total = profile.delay + deep.delay;

  return (
    <section className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <TechniqueBadge label="Sequential awaits" tone="streamed" />
        <h2 className="mt-3 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
          Sequential analysis
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Two mock calls run one after another inside the same Suspense boundary.
        </p>
      </div>
      <ol className="grid gap-2 text-sm">
        {[profile, deep].map((segment, index) => (
          <li
            key={segment.label}
            className="flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-900"
          >
            <span className="text-zinc-700 dark:text-zinc-300">
              {index + 1}. {segment.label}
            </span>
            <span className="font-medium text-zinc-950 dark:text-zinc-50">
              {formatMs(segment.delay)}
            </span>
          </li>
        ))}
      </ol>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Total boundary wait: {formatMs(total)}
      </p>
    </section>
  );
}

async function getClientRecommendations(
  searchParams: SearchParams,
): Promise<Recommendation[]> {
  const delays = await readDelays(searchParams);
  await sleep(delays.client);

  return [
    {
      id: "rebalance",
      title: "Rebalance supply",
      confidence: 91,
      reason:
        "Supply-side posts are arriving faster than buyer interest, so this path prioritizes discounted inventory.",
    },
    {
      id: "watch",
      title: "Watch demand",
      confidence: 84,
      reason:
        "Demand response signals are mixed; keep the segment visible while the next batch of offers lands.",
    },
    {
      id: "bundle",
      title: "Bundle insights",
      confidence: 78,
      reason:
        "Grid analytics and storage interest overlap enough to test a bundled offer in the next update.",
    },
  ];
}

export default function RenderingLabPage({
  searchParams,
}: RenderingLabPageProps) {
  const clientRecommendations = getClientRecommendations(searchParams);

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-6 text-zinc-950 dark:bg-black dark:text-zinc-50 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-6">
        <div className="flex items-center justify-between gap-4 text-sm">
          <Link
            href="/"
            className="font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Home
          </Link>
          <span className="font-mono text-xs text-zinc-500">
            app/rendering-lab/page.tsx
          </span>
        </div>

        <header className="grid gap-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              Next.js rendering lab
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">
              Explore static shells, streaming, client hydration, and PPR.
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Change the mock delays, apply them, and reload to see which parts
              render immediately and which parts stream through Suspense.
            </p>
          </div>
          <Suspense fallback={<ControlsFallback />}>
            <DelayControls />
          </Suspense>
        </header>

        <section className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Technique map
          </h2>
          <div className="flex flex-wrap gap-2">
            <TechniqueBadge label="Server Components by default" tone="static" />
            <TechniqueBadge label="use cache" tone="cached" />
            <TechniqueBadge label="Suspense streaming" tone="streamed" />
            <TechniqueBadge label="Client use()" tone="client" />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <StaticShellOverview />
          <CachedSnapshot />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Suspense
            fallback={
              <StreamSkeleton
                title="Market pulse"
                detail="Waiting for the pulse delay before swapping this fallback."
              />
            }
          >
            <MarketPulse searchParams={searchParams} />
          </Suspense>

          <Suspense
            fallback={
              <StreamSkeleton
                title="Trend table"
                detail="This fallback can be replaced before or after its sibling."
              />
            }
          >
            <TrendTable searchParams={searchParams} />
          </Suspense>

          <Suspense
            fallback={
              <StreamSkeleton
                title="Sequential analysis"
                detail="This waits for profile lookup first, then the deeper read."
              />
            }
          >
            <SequentialRead searchParams={searchParams} />
          </Suspense>

          <Suspense
            fallback={
              <StreamSkeleton
                title="Client stream"
                detail="The server promise is still pending before React use() reads it."
              />
            }
          >
            <ClientRecommendations insights={clientRecommendations} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
