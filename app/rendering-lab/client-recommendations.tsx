"use client";

import { use, useState } from "react";

type Recommendation = {
  id: string;
  title: string;
  confidence: number;
  reason: string;
};

type ClientRecommendationsProps = {
  insights: Promise<Recommendation[]>;
};

export function ClientRecommendations({ insights }: ClientRecommendationsProps) {
  const recommendations = use(insights);
  const [selectedId, setSelectedId] = useState(recommendations[0]?.id ?? "");
  const selected =
    recommendations.find((recommendation) => recommendation.id === selectedId) ??
    recommendations[0];

  return (
    <section className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
          Client Component
        </p>
        <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
          Promise streamed into React use()
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          The server starts the mock request and passes the unresolved promise to
          this client component.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {recommendations.map((recommendation) => (
          <button
            key={recommendation.id}
            type="button"
            onClick={() => setSelectedId(recommendation.id)}
            className={`rounded-md border px-3 py-2 text-left text-sm transition ${
              selected?.id === recommendation.id
                ? "border-sky-500 bg-sky-50 text-sky-950 dark:border-sky-400 dark:bg-sky-950 dark:text-sky-50"
                : "border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
            }`}
          >
            <span className="block font-medium">{recommendation.title}</span>
            <span className="mt-1 block text-xs opacity-75">
              {recommendation.confidence}% confidence
            </span>
          </button>
        ))}
      </div>

      {selected ? (
        <div className="rounded-md bg-zinc-50 p-4 text-sm leading-6 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          {selected.reason}
        </div>
      ) : null}
    </section>
  );
}
