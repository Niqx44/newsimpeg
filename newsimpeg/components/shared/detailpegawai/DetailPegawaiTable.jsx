"use client";

import React, { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmDeleteModal from "./DetailHapusModal";

export default function DetailPegawaiTable({
  columns = [],
  data = [],
  pageSize = 5,
  openAdd,
  onEdit,
  onDelete,
  onViewFile,
}) {
  const [page, setPage] = useState(1);
  const [pageSizeState, setPageSizeState] = useState(pageSize);
  const [search, setSearch] = useState("");
  const [deleteData, setDeleteData] = useState(null);

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
  const totalPages = Math.max(1, Math.ceil(total / pageSizeState));

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSizeState;
    return filteredData.slice(start, start + pageSizeState);
  }, [filteredData, page, pageSizeState]);

  if (page > totalPages) setPage(1);

  /* ================= CELL ================= */
  function renderCell(col, row, idx) {
    if (col.key === "no") {
      return (page - 1) * pageSizeState + idx + 1;
    }

    if (col.key === "file") {
      return row.file ? (
        <button
          onClick={() => onViewFile?.(row)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
        >
          View
        </button>
      ) : (
        "-"
      );
    }

    if (col.key === "action") {
      return (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit?.(row)}
            className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded"
          >
            <Pencil size={14} />
          </button>

          <button
            onClick={() => setDeleteData(row)}
            className="bg-red-600 hover:bg-red-700 p-2 rounded"
          >
            <Trash2 size={14} />
          </button>
        </div>
      );
    }

    return row[col.key] ?? "-";
  }

  return (
    <div className="w-full">

      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span>Show</span>
          <select
            value={pageSizeState}
            onChange={(e) => {
              setPageSizeState(Number(e.target.value));
              setPage(1);
            }}
            className="bg-[#374151] px-2 py-1 rounded"
          >
            {[5, 10, 25, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span>entries</span>
        </div>

        <div className="flex gap-2">
          {openAdd && (
            <button
              onClick={openAdd}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
            >
              + Tambah
            </button>
          )}

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
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-gray-200 table-fixed">
          <thead className="bg-[#262626]">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="py-3 px-4 text-center">
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
                  <td key={col.key} className="py-3 px-4 text-center whitespace-normal wrap-break-words">
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

      {/* ===== FOOTER ===== */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
        <div>
          Showing {total === 0 ? 0 : (page - 1) * pageSizeState + 1} to{" "}
          {Math.min(page * pageSizeState, total)} of {total} entries
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

      <ConfirmDeleteModal
        open={!!deleteData}
        description="Apakah Anda yakin ingin menghapus data ini?"
        onClose={() => setDeleteData(null)}
        onConfirm={() => {
          onDelete?.(deleteData.id);
          setDeleteData(null);
        }}
      />
    </div>
  );
}
