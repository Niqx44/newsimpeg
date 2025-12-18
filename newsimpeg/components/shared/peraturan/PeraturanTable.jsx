"use client";

import { useMemo, useState } from "react";
import { Download, Pencil, Trash2 } from "lucide-react";

export default function PeraturanTable({
  data = [],
  isAdmin = false,
  pageSizeDefault = 10,
  onAdd,
  onEdit,
  onDelete,
  onDownload,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeDefault);
  const [search, setSearch] = useState("");

  /* ================= FILTER ================= */
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      `${row.judul} ${row.peraturan}`
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

  /* ================= DOWNLOAD HANDLER ================= */
        function handleDownload(row) {
    if (!row) return;

    // CASE 1: fileUrl (string)
    if (typeof row.fileUrl === "string" && row.fileUrl) {
        triggerDownload(row.fileUrl);
        return;
    }

    // CASE 2: file berupa STRING path (JSON)
    if (typeof row.file === "string" && row.file) {
        triggerDownload(row.file);
        return;
    }

    // CASE 3: file dari upload (File object)
    if (row.file instanceof File) {
        const url = URL.createObjectURL(row.file);
        triggerDownload(url, row.file.name);
        URL.revokeObjectURL(url);
        return;
    }

    alert("File tidak tersedia");
    }

    /* ================= HELPER ================= */
    function triggerDownload(url, filename) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    }


  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
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

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          {isAdmin && (
            <button
              onClick={onAdd}
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
            className="bg-[#374151] px-3 py-2 rounded w-full sm:w-64"
          />
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="relative -mx-6 lg:mx-0 overflow-x-auto lg:overflow-x-visible">
        <table className="w-full min-w-[900px] lg:min-w-full text-sm text-gray-200 table-fixed">
          <thead className="bg-[#262626]">
            <tr>
              <th className="w-12 py-3 px-3 text-center">No</th>
              <th className="w-64 py-3 px-3 text-left">Judul</th>
              <th className="py-3 px-3 text-left">Peraturan</th>
              <th className="w-20 py-3 px-3 text-center">File</th>
              {isAdmin && (
                <th className="w-24 py-3 px-3 text-center">Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {pageData.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                className="border-b border-gray-700 hover:bg-[#3a3a3a]"
              >
                <td className="py-3 px-3 text-center">
                  {(page - 1) * pageSize + idx + 1}
                </td>

                <td className="py-3 px-3 whitespace-normal wrap-break-words">
                  {row.judul}
                </td>

                <td className="py-3 px-3 whitespace-normal wrap-break-words">
                  {row.peraturan}
                </td>

                {/* FILE */}
                <td className="py-3 px-3 text-center">
                    {row.fileUrl || row.file ? (
                        <button
                        onClick={() => handleDownload(row)}
                        className="inline-flex p-2 rounded bg-green-700 hover:bg-green-500"
                        title="Download"
                        >
                        <Download size={18} />
                        </button>
                    ) : (
                        <span className="text-gray-500 text-xs">No File</span>
                    )}
                    </td>

                {/* ACTION (ADMIN ONLY) */}
                {isAdmin && (
                  <td className="py-3 px-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(row)}
                        className="p-2 rounded bg-blue-600 hover:bg-blue-700"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(row)}
                        className="p-2 rounded bg-red-600 hover:bg-red-700"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}

            {total === 0 && (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 text-sm text-gray-300 gap-3">
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

          <button className="px-3 py-1 bg-blue-600 rounded">
            {page}
          </button>

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
