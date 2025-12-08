"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardInfoCard from "@/components/user/DashboardCard";
import PersyaratanModal from "@/components/user/modals/PersyaratanModal";

export default function DashboardUserPage() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const openModal = (jenis) => {
    setType(jenis);
    setOpen(true);
  };

  return (
    <div className="flex-1 overflow-auto">
      <main className="max-w-7xl mx-auto py-6 px-6">

        {/* SUBTITLE */}
        <p className="text-gray-600 mb-6">
          Sistem Informasi Kepegawaian - Universitas Negeri Makassar
        </p>

        {/* CARD PREDIKSI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardInfoCard
            title="KGB"
            subtitle="Prediksi KGB TMT"
            status="Data riwayat KGB Anda belum ada yang di-approve."
            onClick={() => openModal("KGB")}
          />

          <DashboardInfoCard
            title="Pangkat"
            subtitle="Prediksi TMT Pangkat"
            status="SUDAH MAKSIMAL"
            onClick={() => openModal("Pangkat")}
          />

          <DashboardInfoCard
            title="Pensiun"
            subtitle="Prediksi TMT Pensiun"
            status="01-01-2059"
            onClick={() => openModal("Pensiun")}
          />
        </div>

        {/* DATA PEGAWAI & PENGUMUMAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          {/* DATA PEGAWAI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="font-semibold mb-4 text-gray-800">
              Data Pegawai
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Nama : Aidil Pratama</li>
              <li>NIP : 1985072408011004</li>
              <li>Golongan : III/c</li>
              <li>Unit Kerja : Fakultas Teknik</li>
            </ul>
          </motion.div>

          {/* PENGUMUMAN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="font-semibold mb-4 text-gray-800">
              Pengumuman
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>📌 Update Peraturan KGB 2024</li>
              <li>📌 Jadwal Verifikasi Data Pegawai</li>
              <li>📌 Batas Upload Dokumen Pangkat</li>
            </ul>
          </motion.div>

        </div>

        {/* MODAL */}
        <PersyaratanModal
          open={open}
          onClose={() => setOpen(false)}
          type={type}
        />

      </main>
    </div>
  );
}
