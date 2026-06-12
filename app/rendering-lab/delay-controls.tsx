"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { DELAY_FIELDS, DEFAULT_DELAYS } from "./delays";
import type { DelayKey } from "./delays";

function clampDelay(value: FormDataEntryValue | null, key: DelayKey) {
  const field = DELAY_FIELDS.find((candidate) => candidate.key === key);
  const fallback = DEFAULT_DELAYS[key];

  if (!field || typeof value !== "string") {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  const stepped = Math.round(parsed / field.stepMs) * field.stepMs;

  return Math.min(field.maxMs, Math.max(field.minMs, stepped));
}

function readCurrentDelay(searchParams: URLSearchParams, key: DelayKey) {
  return clampDelay(searchParams.get(key), key);
}

export function DelayControls() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const currentParams = new URLSearchParams(searchKey);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextParams = new URLSearchParams(searchKey);

    for (const field of DELAY_FIELDS) {
      const nextValue = clampDelay(formData.get(field.key), field.key);

      if (nextValue === DEFAULT_DELAYS[field.key]) {
        nextParams.delete(field.key);
      } else {
        nextParams.set(field.key, String(nextValue));
      }
    }

    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <form
      key={searchKey}
      onSubmit={onSubmit}
      className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {DELAY_FIELDS.map((field) => (
          <label
            key={field.key}
            className="grid gap-2 rounded-md border border-zinc-200 p-3 text-sm dark:border-zinc-800"
          >
            <span className="font-medium text-zinc-950 dark:text-zinc-50">
              {field.label}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {field.description}
            </span>
            <input
              name={field.key}
              type="number"
              min={field.minMs}
              max={field.maxMs}
              step={field.stepMs}
              defaultValue={readCurrentDelay(currentParams, field.key)}
              className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </label>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="h-10 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Apply delays
        </button>
        <button
          type="button"
          onClick={() => router.replace(pathname, { scroll: false })}
          className="h-10 rounded-md border border-zinc-300 px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
