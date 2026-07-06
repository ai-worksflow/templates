export type MetricTone = "good" | "warn" | "critical";

export interface DashboardMetric {
  key: string;
  label: string;
  value: string;
  trend: number;
  tone: MetricTone;
}

export interface WorkItem {
  key: string;
  owner: string;
  title: string;
  status: "Open" | "Review" | "Blocked";
  priority: "P0" | "P1" | "P2";
}

export const metrics: DashboardMetric[] = [
  { key: "orders", label: "Orders", value: "18,420", trend: 12, tone: "good" },
  { key: "reviews", label: "Pending reviews", value: "76", trend: -8, tone: "warn" },
  { key: "alerts", label: "Risk alerts", value: "9", trend: 3, tone: "critical" },
];

export const workItems: WorkItem[] = [
  { key: "1", owner: "Operations", title: "Review payment callback drift", status: "Review", priority: "P1" },
  { key: "2", owner: "Catalog", title: "Approve seasonal category update", status: "Open", priority: "P2" },
  { key: "3", owner: "Risk", title: "Investigate duplicate refund attempts", status: "Blocked", priority: "P0" },
];

export function getPriorityWeight(priority: WorkItem["priority"]): number {
  return { P0: 3, P1: 2, P2: 1 }[priority];
}
