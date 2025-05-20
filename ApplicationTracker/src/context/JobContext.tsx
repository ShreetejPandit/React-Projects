import React, { createContext, useContext, useState, useEffect } from "react";
import { JobApplication, JobStatus } from "../types";
import {
  getStoredApplications,
  saveApplication,
  deleteApplication,
  updateApplicationStatus,
} from "../utils/storage";

interface JobContextType {
  applications: JobApplication[];
  addApplication: (application: JobApplication) => void;
  updateApplication: (application: JobApplication) => void;
  removeApplication: (id: string) => void;
  updateStatus: (id: string, status: JobStatus) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    const storedApplications = getStoredApplications();
    setApplications(storedApplications);
  }, []);

  const addApplication = (application: JobApplication) => {
    saveApplication(application);
    setApplications((prev) => [...prev, application]);
  };

  const updateApplication = (application: JobApplication) => {
    saveApplication(application);
    setApplications((prev) =>
      prev.map((app) => (app.id === application.id ? application : app))
    );
  };

  const removeApplication = (id: string) => {
    deleteApplication(id);
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const updateStatus = (id: string, status: JobStatus) => {
    updateApplicationStatus(id, status);
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  return (
    <JobContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        removeApplication,
        updateStatus,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
