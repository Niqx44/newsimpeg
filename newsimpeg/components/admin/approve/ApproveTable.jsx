"use client";

import React, { useMemo, useState } from "react";
import { Check, X, Bell } from "lucide-react";

export default function ApproveTable({
  columns = [],
  data = [],
  onAction,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");

  /* ================= FILTER ================= */
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const total = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  /* ================= CELL RENDER ================= */
  function renderCell(col, row, idx) {
    // NO
    if (col.key === "no") {
      return (page - 1) * pageSize + idx + 1;
    }

    // FILE
    if (col.key === "file") {
      return row.file ? (
        <button
          onClick={() => window.open(row.file, "_blank")}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs"
        >
          VIEW
        </button>
      ) : (
        "-"
      );
    }

    // ACTION
    if (col.key === "action") {
      return (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onAction?.({ type: "approve", row })}
            className="bg-green-600 hover:bg-green-700 p-2 rounded"
          >
            <Check size={14} />
          </button>

          <button
            onClick={() => onAction?.({ type: "decline", row })}
            className="bg-red-600 hover:bg-red-700 p-2 rounded"
          >
            <X size={14} />
          </button>

          <button
            onClick={() => onAction?.({ type: "notify", row })}
            className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded text-black"
          >
            <Bell size={14} />
          </button>
        </div>
      );
    }

    return row[col.key] ?? "-";
  }

  return (
    <div className="bg-[#2f2f2f] rounded-xl p-6 w-full">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="bg-gray-700 px-2 py-1 rounded"
          >
            {[5, 10, 15, 25].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span>entries</span>
        </div>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="bg-[#374151] px-3 py-2 rounded w-64"
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-200 table-fixed">
          <thead className="bg-[#262626]">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="py-3 px-4 text-center"
                  style={{
                    width:
                      c.key === "no"
                        ? "60px"
                        : c.key === "action"
                        ? "160px"
                        : "auto",
                  }}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {pageData.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                className="border-b border-gray-700 hover:bg-[#3a3a3a]"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="py-3 px-4 text-center truncate"
                  >
                    {renderCell(col, row, idx)}
                  </td>
                ))}
              </tr>
            ))}

            {total === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-6 text-center text-gray-400"
                >
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-300">
        <div>
          Showing {total === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
          {Math.min(page * pageSize, total)} of {total} entries
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}
