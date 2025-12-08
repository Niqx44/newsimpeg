"use client";

import { useState } from "react";
import ApproveTabsHeader from "@/components/admin/approve/ApproveTabsHeader";
import ApproveTable from "@/components/admin/approve/ApproveTable";
import ConfirmActionModal from "@/components/admin/approve/ConfirmActionModal";

export default function ApprovePage() {
  const [tab, setTab] = useState("golongan");

  // ✅ DATA HARUS STATE (BIAR BISA BERUBAH)
  const [tableData, setTableData] = useState({
    golongan: [
      {
        id: 1,
        nip: "12391913813187",
        nama: "Ahmad",
        jenis: "KGB",
        tanggal: "2024-07-01",
        file: "/public/data/admin.jpg",
      },
    ],
  });

  // ✅ ACTION YANG DIPILIH (approve / decline / notify)
  const [action, setAction] = useState(null);

  const columns = {
    golongan: [
      { key: "no", label: "No" },
      { key: "nip", label: "NIP" },
      { key: "nama", label: "Nama Pegawai" },
      { key: "golongan", label: "Golongan" },
      { key: "tmt", label: "TMT" },
      { key: "file", label: "File" },
      { key: "action", label: "Action" },
    ],
  };

  // ✅ INI YANG TADI KOSONG → SEKARANG ADA LOGIC
  function handleConfirm() {
    if (!action) return;

    const { type, row } = action;

    if (type === "approve" || type === "decline") {
      setTableData((prev) => ({
        ...prev,
        [tab]: prev[tab].filter((r) => r.id !== row.id),
      }));
    }

    if (type === "notify") {
      alert(`📣 Notifikasi dikirim ke ${row.nama}`);
    }

    setAction(null);
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-6">
      <h2 className="text-2xl font-semibold mb-4 text-black">
        Approval Data Pegawai
      </h2>

      <ApproveTabsHeader activeTab={tab} setActiveTab={setTab} />

      <div className="mt-6">
        <ApproveTable
          columns={columns[tab]}
          data={tableData[tab]}
          onAction={setAction}
        />
      </div>

      {/* ✅ MODAL CONFIRM */}
      <ConfirmActionModal
        action={action}
        onClose={() => setAction(null)}
        onConfirm={handleConfirm}
      />
    </main>
  );
}
