import React, { useState } from "react";
import { motion } from "framer-motion";
import { useJobs } from "../context/JobContext";
import { JobApplication, JobStatus } from "../types";

const initialFormState: Omit<JobApplication, "id"> = {
  company: "",
  position: "",
  location: "",
  status: "applied",
  dateApplied: new Date().toISOString().split("T")[0],
  notes: "",
  salary: "",
  jobUrl: "",
  contactPerson: "",
  contactEmail: "",
  nextSteps: "",
  interviewDate: "",
};

export const AddJobForm: React.FC = () => {
  const { addApplication } = useJobs();
  const [formData, setFormData] = useState(initialFormState);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApplication: JobApplication = {
      ...formData,
      id: crypto.randomUUID(),
    };
    addApplication(newApplication);
    setFormData(initialFormState);
    setIsExpanded(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card sticky top-8"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="input mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700"
            >
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="input mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="input mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="dateApplied"
              className="block text-sm font-medium text-gray-700"
            >
              Date Applied
            </label>
            <input
              type="date"
              id="dateApplied"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleChange}
              required
              className="input mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
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

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          {isExpanded ? "Show Less" : "Show More Fields"}
        </button>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="input mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="jobUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Job URL
              </label>
              <input
                type="url"
                id="jobUrl"
                name="jobUrl"
                value={formData.jobUrl}
                onChange={handleChange}
                className="input mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="contactPerson"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Person
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="input mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="contactEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="input mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                className="input mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="nextSteps"
                className="block text-sm font-medium text-gray-700"
              >
                Next Steps
              </label>
              <textarea
                id="nextSteps"
                name="nextSteps"
                value={formData.nextSteps}
                onChange={handleChange}
                rows={2}
                className="input mt-1"
              />
            </div>
          </motion.div>
        )}

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Add Application
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddJobForm;
