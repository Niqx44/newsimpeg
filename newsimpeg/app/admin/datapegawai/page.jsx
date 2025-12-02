"use client";

import React, { useState } from "react";
import PegawaiTable from "@/components/PegawaiTable";
import ResetPasswordModal from "@/components/ResetPasswordModal";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DataPegawaiPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleResetPassword = (id) => {
    setSelectedId(id);
    setShowResetModal(true);
  };

  const confirmResetPassword = () => {
    alert(`Password pegawai ID ${selectedId} berhasil direset!`);
    setShowResetModal(false);
  };

  const handleChangeStatus = (id) => {
    alert(`Ubah status pegawai ID: ${id}`);
  };

  const dataPegawai = [
    { id: 1, nip: "1985072408011004", nama: "Aidil Pratama", status: "AKTIF" },
    { id: 2, nip: "1976081220041001", nama: "Fahmi, A.Md", status: "AKTIF" },
    { id: 3, nip: "197405252001121001", nama: "Basri Kadir, S.Pd", status: "AKTIF" },
    { id: 4, nip: "1985072408011004", nama: "Hasbi, M.Si", status: "AKTIF" },
    { id: 5, nip: "1985072408011004", nama: "Aminah Saibi", status: "AKTIF" },
    { id: 6, nip: "1985072408011004", nama: "Wahid", status: "AKTIF" },
    { id: 7, nip: "1985072408011004", nama: "Wahi", status: "AKTIF" },
    { id: 8, nip: "1985072408011004", nama: "Wah", status: "AKTIF" },
    { id: 9, nip: "1985072408011004", nama: "Wad", status: "AKTIF" },
    { id: 10, nip: "1985072408011004", nama: "Wahd", status: "AKTIF" },
    { id: 11, nip: "1985072408011004", nama: "Wad", status: "AKTIF" },
    { id: 12, nip: "1985072408011004", nama: "Wah", status: "AKTIF" },
  ];

  const filteredData = dataPegawai.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase()) ||
    p.nip.includes(search)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          {/* Tombol Tambah */}
          <Link
            href="/admin/datapegawai/tambahpegawai"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
          >
            <Plus size={18} /> Tambah Pegawai
          </Link>

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 rounded bg-black text-white border border-gray-700 w-60"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* TABEL */}
        <PegawaiTable
          data={currentData}
          onChangeStatus={handleChangeStatus}
          onResetPassword={handleResetPassword}
        />

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
              <button
                key={pNum}
                onClick={() => setPage(pNum)}
                className={`px-3 py-1 rounded ${
                  page === pNum
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {pNum}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {/* RESET PASSWORD MODAL */}
        <ResetPasswordModal
          open={showResetModal}
          onClose={() => setShowResetModal(false)}
          onConfirm={confirmResetPassword}
        />

      </main>
    </div>
  );
}
