export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  severity: "normal" | "warning" | "critical";
}

export const activityItems: ActivityItem[] = [
  { id: "evt_1", title: "Workspace created", detail: "Acme Platform initialized a new workspace.", severity: "normal" },
  { id: "evt_2", title: "Quota threshold", detail: "API calls reached 82% of monthly plan.", severity: "warning" },
  { id: "evt_3", title: "Webhook failures", detail: "Three delivery attempts failed for billing.created.", severity: "critical" },
];

export function getSeverityLabel(severity: ActivityItem["severity"]): string {
  return {
    normal: "Normal",
    warning: "Needs review",
    critical: "Action required",
  }[severity];
}
