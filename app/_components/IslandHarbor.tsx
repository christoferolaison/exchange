import Boat from "./Boat";
import Island from "./Island";
import type { IslandData } from "./types";

async function fetchIslandData(
  data: IslandData,
  delayMs: number,
): Promise<IslandData> {
  // Simulate a slow server-side data fetch
  await new Promise((r) => setTimeout(r, delayMs));
  return data;
}

export default async function IslandHarbor({
  data,
  delayMs,
}: {
  data: IslandData;
  delayMs: number;
}) {
  const resolved = await fetchIslandData(data, delayMs);
  // Boat sails in proportional to (but capped by) the fetch delay so the
  // animation lands shortly after stream commit.
  const sailMs = Math.min(1600, Math.max(900, delayMs * 0.5));

  return (
    <div className="relative flex items-center h-[180px]">
      <Boat data={resolved} durationMs={sailMs} />
      <div className="relative ml-auto z-10">
        <Island data={resolved} />
      </div>
    </div>
  );
}
