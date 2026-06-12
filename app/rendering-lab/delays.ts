export const DELAY_FIELDS = [
  {
    key: "pulse",
    label: "Market pulse",
    description: "Uncached Server Component",
    defaultMs: 1200,
    minMs: 0,
    maxMs: 5000,
    stepMs: 250,
  },
  {
    key: "trends",
    label: "Trend table",
    description: "Parallel Suspense boundary",
    defaultMs: 2200,
    minMs: 0,
    maxMs: 5000,
    stepMs: 250,
  },
  {
    key: "profile",
    label: "Profile lookup",
    description: "First sequential request",
    defaultMs: 900,
    minMs: 0,
    maxMs: 5000,
    stepMs: 250,
  },
  {
    key: "deep",
    label: "Deep read",
    description: "Second sequential request",
    defaultMs: 1600,
    minMs: 0,
    maxMs: 5000,
    stepMs: 250,
  },
  {
    key: "client",
    label: "Client stream",
    description: "Promise passed into use()",
    defaultMs: 2600,
    minMs: 0,
    maxMs: 5000,
    stepMs: 250,
  },
] as const;

export type DelayKey = (typeof DELAY_FIELDS)[number]["key"];

export type DelayConfig = Record<DelayKey, number>;

export const DEFAULT_DELAYS: DelayConfig = {
  pulse: 1200,
  trends: 2200,
  profile: 900,
  deep: 1600,
  client: 2600,
};
