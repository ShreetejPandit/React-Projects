import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useJobs } from "../context/JobContext";
import { JobStatus } from "../types";

const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"];

export const Dashboard: React.FC = () => {
  const { applications } = useJobs();

  const stats = useMemo(() => {
    const byStatus: Record<JobStatus, number> = {
      applied: 0,
      interviewing: 0,
      offered: 0,
      rejected: 0,
      accepted: 0,
    };

    applications.forEach((app) => {
      byStatus[app.status]++;
    });

    return {
      total: applications.length,
      byStatus,
    };
  }, [applications]);

  const pieData = Object.entries(stats.byStatus).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-primary-50"
        >
          <h3 className="text-lg font-semibold text-primary-700">
            Total Applications
          </h3>
          <p className="text-3xl font-bold text-primary-900">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-yellow-50"
        >
          <h3 className="text-lg font-semibold text-yellow-700">
            Interviewing
          </h3>
          <p className="text-3xl font-bold text-yellow-900">
            {stats.byStatus.interviewing}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-green-50"
        >
          <h3 className="text-lg font-semibold text-green-700">Offers</h3>
          <p className="text-3xl font-bold text-green-900">
            {stats.byStatus.offered}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-purple-50"
        >
          <h3 className="text-lg font-semibold text-purple-700">Accepted</h3>
          <p className="text-3xl font-bold text-purple-900">
            {stats.byStatus.accepted}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold mb-4">Applications by Status</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};
