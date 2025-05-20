export interface Job {
  id: string;
  company: string;
  title: string;
  applicationDate: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  notes?: string;
}
