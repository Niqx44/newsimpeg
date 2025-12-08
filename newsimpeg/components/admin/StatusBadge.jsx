"use client";

export default function StatusBadge({ status }) {
  const isActive = status === "AKTIF";

  return (
    <span
      className={`px-3 py-1 rounded text-sm font-medium ${
        isActive
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      {status}
    </span>
  );
}
