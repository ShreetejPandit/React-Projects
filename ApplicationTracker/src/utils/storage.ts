import { Job } from "../types/job";
import { JobApplication, JobStatus } from "../types";

const STORAGE_KEY = "jobs";

export function getJobs(): Job[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to get jobs from LocalStorage:", error);
    return [];
  }
}

export function addJob(job: Omit<Job, "id">): void {
  try {
    const jobs = getJobs();
    const newJob: Job = { ...job, id: crypto.randomUUID() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...jobs, newJob]));
  } catch (error) {
    throw new Error("Failed to add job: " + (error as Error).message);
  }
}

export function updateJob(id: string, updatedJob: Job): void {
  try {
    const jobs = getJobs();
    const index = jobs.findIndex((j) => j.id === id);
    if (index === -1) throw new Error("Job not found");
    jobs[index] = updatedJob;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  } catch (error) {
    throw new Error("Failed to update job: " + (error as Error).message);
  }
}

export function deleteJob(id: string): void {
  try {
    const jobs = getJobs();
    const filtered = jobs.filter((j) => j.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    throw new Error("Failed to delete job: " + (error as Error).message);
  }
}

export const getStoredApplications = (): JobApplication[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to get applications from LocalStorage:", error);
    return [];
  }
};

export const saveApplication = (application: JobApplication): void => {
  try {
    const applications = getStoredApplications();
    const existingIndex = applications.findIndex(
      (app) => app.id === application.id
    );

    if (existingIndex >= 0) {
      applications[existingIndex] = application;
    } else {
      applications.push(application);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch (error) {
    console.error("Failed to save application:", error);
  }
};

export const deleteApplication = (id: string): void => {
  try {
    const applications = getStoredApplications();
    const filteredApplications = applications.filter((app) => app.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredApplications));
  } catch (error) {
    console.error("Failed to delete application:", error);
  }
};

export const updateApplicationStatus = (
  id: string,
  status: JobStatus
): void => {
  try {
    const applications = getStoredApplications();
    const application = applications.find((app) => app.id === id);

    if (application) {
      application.status = status;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    }
  } catch (error) {
    console.error("Failed to update application status:", error);
  }
};
