"use client";

import { useState } from "react";
import ApproveTabsHeader from "@/components/approve/ApproveTabsHeader";
import ApproveTable from "@/components/approve/ApproveTable";
import ConfirmActionModal from "@/components/approve/ConfirmActionModal";

export default function ApprovePage() {
  const [tab, setTab] = useState("golongan");

  // ✅ DATA HARUS STATE (BIAR BISA BERUBAH)
  const [tableData, setTableData] = useState({
    golongan: [
      {
        id: 1,
        nip: "1987001",
        nama: "Budi",
        golongan: "III/b",
        tmt: "2020-01-01",
        file: "-",
      },
      {
        id: 2,
        nip: "1987002",
        nama: "Siti",
        golongan: "III/c",
        tmt: "2021-02-01",
        file: "-",
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
