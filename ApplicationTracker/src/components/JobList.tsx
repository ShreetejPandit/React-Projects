import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useJobs } from "../context/JobContext";
import { JobApplication, JobStatus } from "../types";
import {
  FiEdit2,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
} from "react-icons/fi";

const statusColors: Record<JobStatus, string> = {
  applied: "bg-blue-100 text-blue-800",
  interviewing: "bg-yellow-100 text-yellow-800",
  offered: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  accepted: "bg-purple-100 text-purple-800",
};

export const JobList: React.FC = () => {
  const { applications, removeApplication, updateStatus } = useJobs();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "company">("date");
  const [filterStatus, setFilterStatus] = useState<JobStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedAndFilteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        const matchesSearch = searchQuery
          ? app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.location.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

        const matchesStatus =
          filterStatus === "all" || app.status === filterStatus;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          return (
            new Date(b.dateApplied).getTime() -
            new Date(a.dateApplied).getTime()
          );
        }
        return a.company.localeCompare(b.company);
      });
  }, [applications, searchQuery, filterStatus, sortBy]);

  const handleStatusChange = (id: string, newStatus: JobStatus) => {
    updateStatus(id, newStatus);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by company, position, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "company")}
              className="input"
            >
              <option value="date">Sort by Date</option>
              <option value="company">Sort by Company</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as JobStatus | "all")
              }
              className="input"
            >
              <option value="all">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          {sortedAndFilteredApplications.length} applications found
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {sortedAndFilteredApplications.map((application) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {application.company}
                    </h3>
                    <p className="text-gray-600">{application.position}</p>
                    <p className="text-sm text-gray-500">
                      {application.location}
                    </p>
                    <p className="text-sm text-gray-500">
                      Applied:{" "}
                      {new Date(application.dateApplied).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        statusColors[application.status]
                      }`}
                    >
                      {application.status}
                    </span>
                    <button
                      onClick={() => toggleExpand(application.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {expandedId === application.id ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )}
                    </button>
                  </div>
                </div>

                {expandedId === application.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-4 pt-4 border-t"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          value={application.status}
                          onChange={(e) =>
                            handleStatusChange(
                              application.id,
                              e.target.value as JobStatus
                            )
                          }
                          className="input mt-1"
                        >
                          <option value="applied">Applied</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="offered">Offered</option>
                          <option value="rejected">Rejected</option>
                          <option value="accepted">Accepted</option>
                        </select>
                      </div>
                    </div>

                    {application.salary && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Salary
                        </label>
                        <p className="mt-1">{application.salary}</p>
                      </div>
                    )}

                    {application.jobUrl && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Job URL
                        </label>
                        <a
                          href={application.jobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 mt-1 block"
                        >
                          {application.jobUrl}
                        </a>
                      </div>
                    )}

                    {application.contactPerson && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Contact Person
                        </label>
                        <p className="mt-1">{application.contactPerson}</p>
                      </div>
                    )}

                    {application.contactEmail && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Contact Email
                        </label>
                        <a
                          href={`mailto:${application.contactEmail}`}
                          className="text-primary-600 hover:text-primary-700 mt-1 block"
                        >
                          {application.contactEmail}
                        </a>
                      </div>
                    )}

                    {application.notes && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Notes
                        </label>
                        <p className="mt-1 whitespace-pre-wrap">
                          {application.notes}
                        </p>
                      </div>
                    )}

                    {application.nextSteps && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Next Steps
                        </label>
                        <p className="mt-1 whitespace-pre-wrap">
                          {application.nextSteps}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        onClick={() => removeApplication(application.id)}
                        className="text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <FiTrash2 />
                        Delete Application
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default JobList;
