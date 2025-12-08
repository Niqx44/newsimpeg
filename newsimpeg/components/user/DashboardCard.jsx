"use client";

import { motion } from "framer-motion";

export default function DashboardInfoCard({
  title,
  subtitle,
  status,
  buttonText = "PERSYARATAN",
  onClick, // ⬅️ handler dari parent (Dashboard)
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
    >
      {/* CONTENT */}
      <div>
        <h3 className="text-lg font-semibold text-sky-500 mb-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mb-3">
          {subtitle}
        </p>

        <p className="text-sm text-gray-800">
          {status}
        </p>
      </div>

      {/* ACTION */}
      <div className="flex justify-end mt-4">
        <button
          onClick={onClick}
          className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-xs px-4 py-2 rounded transition"
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
}
