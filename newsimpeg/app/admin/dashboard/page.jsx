"use client";

import React from "react";
import StatCard from "@/components/admin/StatCard";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import GolonganChart from "@/components/admin/charts/GolonganChart";
import CutiTerbaruTable from "@/components/admin/tables/CutiTerbaruTable";
import PendidikanChart from "@/components/admin/charts/PendidikanChart";


const DashboardPage = () => {

  const golonganData = [
    { golongan: "IV", jumlah: 360 },
    { golongan: "III", jumlah: 450 },
    { golongan: "II", jumlah: 250 },
  ];

  const pendidikanData = [
  { pendidikan: "S3", jumlah: 120 },
  { pendidikan: "S2", jumlah: 380 },
  { pendidikan: "S1", jumlah: 560 },
];


  const cutiTerbaru = [
    { nama: "Andi", jenis: "Cuti Tahunan", tanggal: "2025-01-10", status: "Menunggu" },
    { nama: "Budi", jenis: "Cuti Sakit", tanggal: "2025-01-05", status: "Disetujui" },
    { nama: "Siti", jenis: "Cuti Melahirkan", tanggal: "2025-01-03", status: "Ditolak" },
  ];

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
        
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Tenaga Pendidik" icon={Users} value="100"/>
          <StatCard name="Tenaga Kependidikan" icon={Users} value="100" />
          <StatCard name="Tenaga Honorer" icon={Users} value="100" />
          <StatCard name="Unit Kerja" icon={Users} value="15" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <GolonganChart data={golonganData} />
          <PendidikanChart data={pendidikanData} />
        </motion.div>


        {/* Tabel Pengajuan Cuti */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          <CutiTerbaruTable data={cutiTerbaru} />
        </motion.div>

      </main>
    </div>
  );
};

export default DashboardPage;
