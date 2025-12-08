"use client";

import React, { useMemo, useState } from "react";
import ConfirmDeleteModal from "./DetailHapusModal";

export default function DetailPegawaiTable({
  columns,
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

  // 🔍 Global search
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

  function renderCell(col, row, idx) {
    if (col.key === "no")
      return (page - 1) * pageSizeState + idx + 1;

    if (col.key === "file") {
      return row.file ? (
        <div className="flex justify-center">
          <button
            onClick={() => onViewFile?.(row)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs"
          >
            View
          </button>
        </div>
      ) : (
        <div className="text-center text-xs text-gray-400">-</div>
      );
    }

    if (col.key === "action") {
      return (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit?.(row)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs"
          >
            Edit
          </button>
          <button
            onClick={() => setDeleteData(row)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs"
          >
            Hapus
          </button>
        </div>
      );
    }

    const value = row[col.key];
    if (value === null || value === undefined || value === "") return "-";
    return value;
  }

  function getAlignClass(col) {
    if (col.align === "center") return "text-center";
    if (col.align === "right") return "text-right";
    return "text-left";
  }

  if (page > totalPages) setPage(1);

  return (
    <div>
      {/* 🔝 HEADER */}
      <div className="flex items-center justify-between mb-4">
        {/* LEFT */}
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span>Show</span>
          <select
            value={pageSizeState}
            onChange={(e) => {
              setPageSizeState(Number(e.target.value));
              setPage(1);
            }}
            className="bg-gray-700 text-white rounded px-2 py-1"
          >
            {[5, 10, 25, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span>entries</span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {openAdd && (
            <button
              onClick={openAdd}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
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
            className="bg-gray-700 text-white px-3 py-2 rounded w-60"
          />
        </div>
      </div>

      {/* 📊 TABLE */}
      <div className="bg-[#3b3b3b] rounded-lg overflow-hidden">
        <table className="w-full text-sm text-gray-200 table-fixed">
          <thead className="bg-[#2d2d2d]">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={`py-3 px-4 ${getAlignClass(c)} ${c.width || ""}`}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {pageData.map((row, idx) => (
              <tr key={row.id ?? idx} className="hover:bg-[#474747]">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`py-3 px-4 ${getAlignClass(col)}`}
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
                  Belum ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📘 FOOTER */}
      <div className="flex justify-between items-center mt-3 text-sm text-gray-300">
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
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700"
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

      {/* 🔴 MODAL */}
      <ConfirmDeleteModal
        open={!!deleteData}
        description="Apakah Anda yakin ingin menghapus data ini?"
        onClose={() => setDeleteData(null)}
        onConfirm={() => {
          onDelete?.(deleteData?.id);
          setDeleteData(null);
        }}
      />
    </div>
  );
}
