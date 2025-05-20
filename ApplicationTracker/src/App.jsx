import React from "react";
import { motion } from "framer-motion";
import { JobProvider } from "./context/JobContext";
import AddJobForm from "./components/AddJobForm";
import { Dashboard } from "./components/Dashboard";
import JobList from "./components/JobList";

function App() {
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-8"
            >
              <Dashboard />
              <JobList />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <AddJobForm />
            </motion.div>
          </div>
        </main>
      </div>
    </JobProvider>
  );
}

export default App;
