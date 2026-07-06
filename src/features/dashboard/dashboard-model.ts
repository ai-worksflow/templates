export interface WorkRecord {
  id: string;
  title: string;
  owner: string;
  status: "Open" | "Review" | "Done";
  risk: "Low" | "Medium" | "High";
}

export const workRecords: WorkRecord[] = [
  { id: "1", title: "Audit payment callback route", owner: "Payments", status: "Review", risk: "High" },
  { id: "2", title: "Publish catalog season update", owner: "Catalog", status: "Open", risk: "Medium" },
  { id: "3", title: "Close workflow exception", owner: "Operations", status: "Done", risk: "Low" },
];

export function getRiskLevel(record: WorkRecord): number {
  return { Low: 1, Medium: 2, High: 3 }[record.risk];
}
