"use client";

import { useState } from "react";
import PegawaiTable from "@/components/admin/PegawaiTable";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DataPegawaiPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const dataPegawai = [
    { id: 1, nip: "1985072408011004", nama: "Aidil Pratama", status: "AKTIF" },
    { id: 2, nip: "1976081220041001", nama: "Fahmi, A.Md", status: "AKTIF" },
    { id: 3, nip: "197405252001121001", nama: "Basri Kadir, S.Pd", status: "AKTIF" },
    { id: 4, nip: "197405252001121001", nama: "Basri Kadir, S.Pd", status: "AKTIF" },
    { id: 5, nip: "197405252001121001", nama: "Basri Kadir, S.Pd", status: "AKTIF" },
    { id: 6, nip: "197405252001121001", nama: "Basri Kadir, S.Pd", status: "AKTIF" },
    { id: 7, nip: "197405252001121001", nama: "Basri Kadir, S.Pd", status: "AKTIF" },
    { id: 8, nip: "197405252001121001", nama: "Basri Kadir, S.Pd", status: "AKTIF" },
    { id: 9, nip: "197405252001121001", nama: "Basri Kadir, S.Pd", status: "AKTIF" },
    { id: 10, nip: "197405252001121001", nama: "Basri Kadir, S.Pd", status: "AKTIF" },
    { id: 11, nip: "197405252001121001", nama: "Basri Kadir, S.Pd", status: "AKTIF" },
    { id: 12, nip: "197405252001121001", nama: "Basri Kadir, S.Pd", status: "AKTIF" },
  ];

  // FILTER
  const filtered = dataPegawai.filter(
    (p) =>
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.nip.includes(search)
  );

  // PAGINATION
  const totalPages = Math.ceil(filtered.length / limit) || 1;
  const start = (page - 1) * limit;
  const currentData = filtered.slice(start, start + limit);

  return (
    <div className="flex-1 overflow-auto">
      <main className="max-w-7xl mx-auto py-6 px-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-black">
            Sistem Informasi Kepegawaian – Universitas Negeri Makassar
          </h1>
          <p className="text-gray-600">
            Data Pegawai Aktif dan Berkembang
          </p>
        </div>

        {/* CARD */}
        <div className="bg-[#2b2b2b] rounded-xl shadow-lg p-6">

          {/* CONTROLS */}
          <div className="flex justify-between items-center mb-4">
            
            {/* SHOW ENTRIES */}
            <div className="flex items-center gap-2 text-sm text-gray-300">
              Show
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="bg-[#1f1f1f] border border-gray-600 rounded px-2 py-1 text-white"
              >
                {[5, 10, 25].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              entries
            </div>

            {/* SEARCH + TAMBAH */}
            <div className="flex items-center gap-3">
              <input
                placeholder="Search..."
                className="bg-[#374151] text-white px-4 py-2 rounded-md placeholder-gray-400 w-56"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />

              <Link
                href="/admin/datapegawai/tambahpegawai"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                <Plus size={18} />
                Tambah
              </Link>
            </div>
          </div>

          {/* TABLE */}
          <PegawaiTable
            data={currentData}
            page={page}
            limit={limit}
            onChangeStatus={(id) =>
              alert(`Ubah status pegawai ID ${id}`)
            }
            onResetPassword={(id) =>
              alert(`Reset password pegawai ID ${id}`)
            }
          />

          {/* FOOTER */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
            <div>
              Showing {filtered.length ? start + 1 : 0} to{" "}
              {start + currentData.length} of {filtered.length} entries
            </div>

            {/* PAGINATION */}
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 rounded bg-[#1f1f1f] disabled:text-gray-500"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded ${
                    page === p
                      ? "bg-blue-600 text-white"
                      : "bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a]"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 rounded bg-[#1f1f1f] disabled:text-gray-500"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
