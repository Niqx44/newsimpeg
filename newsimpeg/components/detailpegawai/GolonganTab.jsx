"use client";
import React, { useState, useMemo } from "react";

export default function GolonganTab({
  golongan,
  openTambahGolongan,
  openEditGolongan,
  requestDeleteGolongan,
  viewGolonganFile,
}) {
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(golongan.length / itemsPerPage));

  // ensure page within range
  if (page > totalPages) setPage(totalPages);

  const currentData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return golongan.slice(start, start + itemsPerPage);
  }, [golongan, page]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Riwayat Golongan</h3>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow" onClick={openTambahGolongan}>
          + Tambah
        </button>
      </div>

      <div className="bg-[#3b3b3b] rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-sm text-gray-200">
          <thead className="bg-[#2d2d2d] text-gray-100">
            <tr>
              <th className="py-3 px-4 w-12 text-left">No</th>
              <th className="py-3 px-4 text-left">Jenis KP</th>
              <th className="py-3 px-4 text-left">Golongan</th>
              <th className="py-3 px-4 text-left">TMT</th>
              <th className="py-3 px-4 text-left">Masa Kerja</th>
              <th className="py-3 px-4 text-center">File</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {currentData.map((row, idx) => (
              <tr key={row.id} className="hover:bg-[#474747] transition">
                <td className="py-3 px-4">{(page - 1) * itemsPerPage + idx + 1}</td>
                <td className="py-3 px-4">{row.jenis_kp}</td>
                <td className="py-3 px-4">{row.golongan}</td>
                <td className="py-3 px-4">{row.tmt}</td>
                <td className="py-3 px-4 whitespace-nowrap">{row.masa_kerja}</td>
                <td className="py-3 px-4 text-center">
                  <button className="bg-purple-600 hover:bg-purple-700 px-4 py-1.5 rounded text-xs font-medium shadow" onClick={() => viewGolonganFile(row)}>
                    View
                  </button>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-xs font-medium shadow" onClick={() => openEditGolongan(row)}>
                      Edit
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-xs font-medium shadow" onClick={() => requestDeleteGolongan(row.id)}>
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {golongan.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-400">
                  Belum ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {golongan.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-3">
          <div className="text-sm text-gray-300">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, golongan.length)} of {golongan.length} entries
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40">
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
              <button key={pNum} onClick={() => setPage(pNum)} className={`px-3 py-1 rounded ${pNum === page ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                {pNum}
              </button>
            ))}

            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
