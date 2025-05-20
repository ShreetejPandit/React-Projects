import React, { useState, useCallback } from "react";
import AddJobForm from "../components/AddJobForm";
import JobList from "../components/JobList";
import { getJobs } from "../utils/storage";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const statusColors = {
  Applied: "#2563eb",
  Interview: "#f59e42",
  Offer: "#22c55e",
  Rejected: "#ef4444",
};

const Dashboard = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const jobs = getJobs();
  const statusData = [
    {
      name: "Applied",
      value: jobs.filter((j) => j.status === "Applied").length,
    },
    {
      name: "Interview",
      value: jobs.filter((j) => j.status === "Interview").length,
    },
    { name: "Offer", value: jobs.filter((j) => j.status === "Offer").length },
    {
      name: "Rejected",
      value: jobs.filter((j) => j.status === "Rejected").length,
    },
  ];

  const handleSuccess = useCallback(() => {
    setRefreshFlag((f) => !f);
  }, []);

  const handleEdit = (job) => {
    setEditJob(job);
  };

  const handleCancelEdit = () => {
    setEditJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow py-6 mb-8"
      >
        <h1 className="text-3xl font-extrabold text-center text-primary tracking-tight drop-shadow">
          Job Tracker
        </h1>
      </motion.header>
      <div className="max-w-5xl mx-auto px-2 flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-8 items-center justify-center"
        >
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <h2 className="font-bold text-lg mb-2 text-gray-700">
              Application Status Overview
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  innerRadius={40}
                  label={({ name, value }) =>
                    value > 0 ? `${name}: ${value}` : ""
                  }
                >
                  {statusData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={statusColors[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2">
            <AddJobForm
              onSuccess={handleSuccess}
              editJob={editJob}
              onCancelEdit={handleCancelEdit}
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <JobList onEdit={handleEdit} refreshFlag={refreshFlag} />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
