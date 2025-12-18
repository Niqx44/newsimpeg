"use client";

import { useMemo, useState } from "react";

export default function OrganisasiTable({
  data = [],
  isAdmin = false,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
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
              <option key={n} value={n}>
                {n}
              </option>
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

      <div className="relative -mx-6 lg:mx-0 overflow-x-auto lg:overflow-x-visible">
        <table className="w-full min-w-[900px] lg:min-w-full text-sm text-gray-200 table-fixed">
          <thead className="bg-[#262626]">
            <tr>
              <th className="w-12 py-3 px-3 text-center">No</th>
              <th className="w-36 py-3 px-3 text-left">Kode Organisasi</th>
              <th className="py-3 px-3 text-left">Organisasi / Unit Kerja</th>
              <th className="w-20 py-3 px-3 text-center">Eselon</th>
              <th className="py-3 px-3 text-left">Organisasi Induk</th>
              <th className="py-3 px-3 text-left">Pimpinan</th>
              <th className="w-40 py-3 px-3 text-left">Jabatan Pimpinan</th>
              {isAdmin && (
                <th className="w-32 py-3 px-3 text-center">Action</th>
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
                <td className="py-3 px-3 wrap-break-words">
                  {row.kode}
                </td>
                <td className="py-3 px-3 wrap-break-words">
                  {row.nama}
                </td>
                <td className="py-3 px-3 text-center">
                  {row.eselon}
                </td>
                <td className="py-3 px-3 wrap-break-words">
                  {row.induk}
                </td>
                <td className="py-3 px-3 wrap-break-words">
                  {row.pimpinan}
                </td>
                <td className="py-3 px-3 wrap-break-words">
                  {row.jabatan_pimpinan}
                </td>

                {isAdmin && (
                  <td className="py-3 px-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(row)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(row)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}

            {total === 0 && (
              <tr>
                <td
                  colSpan={isAdmin ? 8 : 7}
                  className="py-6 text-center text-gray-400"
                >
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 text-sm text-gray-300 gap-3">
        <div>
          Showing{" "}
          {total === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
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
