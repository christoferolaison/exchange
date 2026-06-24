export type IslandStatus = "thriving" | "sleepy" | "busy" | "wild";

export type IslandData = {
  name: string;
  population: number;
  status: IslandStatus;
  emoji: string;
};
