export interface UsageMetric {
  key: string;
  label: string;
  value: string;
  quota: number;
  used: number;
}

export const usageMetrics: UsageMetric[] = [
  { key: "api", label: "API usage", value: "1.8M", quota: 2500000, used: 1800000 },
  { key: "storage", label: "Storage", value: "412 GB", quota: 1024, used: 412 },
  { key: "seats", label: "Seats", value: "42", quota: 60, used: 42 },
];

export function getUsageRatio(metric: UsageMetric): number {
  if (metric.quota <= 0) {
    return 0;
  }

  return Math.min(metric.used / metric.quota, 1);
}
