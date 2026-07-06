export interface JobStatus {
  id: string;
  name: string;
  progress: number;
  state: "Queued" | "Running" | "Failed" | "Done";
}

export const jobs: JobStatus[] = [
  { id: "job_1", name: "Transcode product launch video", progress: 72, state: "Running" },
  { id: "job_2", name: "Generate thumbnails", progress: 100, state: "Done" },
  { id: "job_3", name: "Moderation scan", progress: 18, state: "Queued" },
];

export function getIncompleteJobs(items: JobStatus[]): JobStatus[] {
  return items.filter((item) => item.state !== "Done");
}
