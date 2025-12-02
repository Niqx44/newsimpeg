// components/detailpegawai/GenericTable.jsx
"use client";

import React, { useMemo, useState } from "react";

export default function GenericTable({
  columns,
  data = [],
  pageSize = 5,
  openAdd,
  onEdit,
  onDelete,
  onViewFile,
}) {
  const [page, setPage] = useState(1);

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  function renderCell(col, row, idx) {
    if (col.key === "no") return (page - 1) * pageSize + idx + 1;
    if (col.key === "file") {
      return row.file ? (
        <div className="flex justify-center">
          <button onClick={() => onViewFile?.(row)} className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded text-xs">
            View
          </button>
        </div>
      ) : <div className="text-center text-xs text-gray-400">-</div>;
    }
    if (col.key === "action") {
      return (
        <div className="flex justify-center gap-2">
          <button onClick={() => onEdit?.(row)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs">
            Edit
          </button>
          <button onClick={() => onDelete?.(row.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs">
            Hapus
          </button>
        </div>
      );
    }
    // default render with wrap
    const value = row[col.key];
    if (value === null || value === undefined || value === "") return "-";
    return value;
  }

  function getAlignClass(col) {
    if (col.align === "center") return "text-center";
    if (col.align === "right") return "text-right";
    return "text-left";
  }

  // if page > totalPages because data changed, reset
  if (page > totalPages) setPage(1);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {openAdd ? (
          <button onClick={openAdd} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
            + Tambah
          </button>
        ) : <div />}
      </div>

      <div className="bg-[#3b3b3b] rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-sm text-gray-200 table-fixed">
          <thead className="bg-[#2d2d2d] text-gray-100">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className={`py-3 px-4 font-semibold ${getAlignClass(c)} ${c.width || ""}`}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {pageData.map((row, idx) => (
              <tr key={row.id ?? idx} className="hover:bg-[#474747] transition text-gray-100 align-top">
                {columns.map((col) => (
                  <td key={col.key} className={`py-3 px-4 align-top ${getAlignClass(col)} break-words`}>
                    {renderCell(col, row, idx)}
                  </td>
                ))}
              </tr>
            ))}

            {total === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-6 text-center text-gray-400">
                  Belum ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="text-gray-300 text-sm">
          Showing {total === 0 ? 0 : (page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total} entries
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40">
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
              <button key={pNum} onClick={() => setPage(pNum)} className={`px-3 py-1 rounded ${pNum === page ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                {pNum}
              </button>
            ))}
          </div>

          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
