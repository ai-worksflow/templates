export interface GameStat {
  key: string;
  label: string;
  value: string;
  completion: number;
}

export const gameStats: GameStat[] = [
  { key: "season", label: "Season progress", value: "Level 42", completion: 68 },
  { key: "inventory", label: "Inventory sync", value: "142 items", completion: 92 },
  { key: "leaderboard", label: "Leaderboard rank", value: "#128", completion: 81 },
];

export function getCompletionLabel(value: number): string {
  if (value >= 90) return "Excellent";
  if (value >= 75) return "Healthy";
  if (value >= 50) return "Watch";
  return "Needs work";
}
