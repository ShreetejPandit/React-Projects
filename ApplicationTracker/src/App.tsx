import React, { useState } from "react";
import { motion } from "framer-motion";
import { JobProvider } from "./context/JobContext";
import AddJobForm from "./components/AddJobForm";
import JobList from "./components/JobList";
import { Dashboard } from "./components/Dashboard";
import { FiList, FiBarChart2 } from "react-icons/fi";

function App() {
  const [activeTab, setActiveTab] = useState<"list" | "dashboard">("list");

  return (
    <JobProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Job Application Tracker
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex space-x-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("list")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 ${
                  activeTab === "list"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FiList />
                Applications
              </button>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 ${
                  activeTab === "dashboard"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FiBarChart2 />
                Dashboard
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "list" ? (
              <>
                <AddJobForm />
                <JobList />
              </>
            ) : (
              <Dashboard />
            )}
          </motion.div>
        </main>
      </div>
    </JobProvider>
  );
}

export default App;
