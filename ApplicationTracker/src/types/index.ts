export type JobStatus =
  | "applied"
  | "interviewing"
  | "offered"
  | "rejected"
  | "accepted";

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  status: JobStatus;
  dateApplied: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  contactPerson?: string;
  contactEmail?: string;
  nextSteps?: string;
  interviewDate?: string;
}

export interface JobStats {
  total: number;
  byStatus: Record<JobStatus, number>;
  byMonth: Record<string, number>;
  byLocation: Record<string, number>;
}
