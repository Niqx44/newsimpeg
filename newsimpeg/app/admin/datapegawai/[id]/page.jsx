"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// IMPORT COMPONENT
import TabsHeader from "@/components/detailpegawai/TabsHeader";
import ProfileTab from "@/components/detailpegawai/ProfileTab";
import GolonganTab from "@/components/detailpegawai/GolonganTab";
import GolonganModal from "@/components/detailpegawai/GolonganModal";
import DeleteConfirmModal from "@/components/detailpegawai/DeleteConfirmModal";
import EditProfileModal from "@/components/detailpegawai/EditProfileModal";

const dummyGolonganInitial = [
  {
    id: 1,
    jenis_kp: "KP Reguler",
    golongan: "III/c",
    tmt: "01-04-2017",
    masa_kerja: "07 Tahun 04 Bulan",
    file: null,
  },
];

export default function DetailPegawaiPage() {
  const { id } = useParams();

  const [pegawai, setPegawai] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  // state golongan
  const [golongan, setGolongan] = useState(dummyGolonganInitial);
  const [showGolonganModal, setShowGolonganModal] = useState(false);
  const [editingGolonganId, setEditingGolonganId] = useState(null);
  const [golonganForm, setGolonganForm] = useState({
    jenis_kp: "",
    golongan: "",
    tmt: "",
    masa_kerja: "",
    file: null,
  });

  const [showEditModal, setShowEditModal] = useState(false);

  // delete confirm
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    async function loadPegawai() {
      try {
        const res = await fetch("/data/pegawai.json");
        const list = await res.json();
        const found = list.find((p) => String(p.id) === String(id));
        setPegawai(found || "NOT_FOUND");
      } catch (err) {
        console.error("Error:", err);
        setPegawai("NOT_FOUND");
      }
    }
    loadPegawai();
  }, [id]);

  // Handlers Golongan
  const openTambahGolongan = () => {
    setEditingGolonganId(null);
    setGolonganForm({ jenis_kp: "", golongan: "", tmt: "", masa_kerja: "", file: null });
    setShowGolonganModal(true);
  };

  const openEditGolongan = (row) => {
    setEditingGolonganId(row.id);
    setGolonganForm({
      jenis_kp: row.jenis_kp,
      golongan: row.golongan,
      tmt: row.tmt,
      masa_kerja: row.masa_kerja,
      file: row.file,
    });
    setShowGolonganModal(true);
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setGolonganForm((s) => ({ ...s, file: { name: f.name, url } }));
  };

  const saveGolongan = () => {
    const { jenis_kp, golongan: gol, tmt, masa_kerja, file } = golonganForm;
    if (!jenis_kp || !gol || !tmt) return alert("Field wajib belum lengkap");

    if (editingGolonganId) {
      setGolongan((prev) =>
        prev.map((r) =>
          r.id === editingGolonganId ? { ...r, jenis_kp, golongan: gol, tmt, masa_kerja, file } : r
        )
      );
    } else {
      setGolongan((prev) => [
        ...prev,
        { id: Date.now(), jenis_kp, golongan: gol, tmt, masa_kerja, file },
      ]);
    }

    setShowGolonganModal(false);
  };

  const requestDeleteGolongan = (id) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteGolongan = () => {
    setGolongan((prev) => prev.filter((r) => r.id !== deleteTargetId));
    setShowDeleteConfirm(false);
  };

  const viewGolonganFile = (row) => {
    if (!row.file) return alert("Tidak ada file.");
    window.open(row.file.url, "_blank");
  };

  // LOADING
  if (pegawai === null) return <div className="p-6 text-gray-200">Loading...</div>;

  // NOT FOUND
  if (pegawai === "NOT_FOUND")
    return (
      <div className="flex items-center justify-center h-[70vh] text-black text-lg font-semibold">
        ❌ Data Pegawai dengan ID {id} tidak ditemukan.
      </div>
    );

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-black mb-4">
          NIP : <span className="text-black">{pegawai.nip}</span>
        </h2>

        <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="bg-[#2b2b2b] p-6 rounded-xl shadow-md">
          {activeTab === "profile" && (
            <ProfileTab pegawai={pegawai} onEdit={() => setShowEditModal(true)} />
          )}

          {activeTab === "golongan" && (
            <GolonganTab
              golongan={golongan}
              openTambahGolongan={openTambahGolongan}
              openEditGolongan={openEditGolongan}
              requestDeleteGolongan={requestDeleteGolongan}
              viewGolonganFile={viewGolonganFile}
            />
          )}

          {/* Placeholder lainnya */}
          {activeTab !== "profile" && activeTab !== "golongan" && (
            <div className="text-gray-300">Konten {activeTab} belum dibuat…</div>
          )}
        </div>

        {/* MODALS */}
        {showGolonganModal && (
          <GolonganModal
            editingId={editingGolonganId}
            form={golonganForm}
            setForm={setGolonganForm}
            onClose={() => setShowGolonganModal(false)}
            onSave={saveGolongan}
            handleFile={handleFileChange}
          />
        )}

        {showDeleteConfirm && (
          <DeleteConfirmModal
            onCancel={() => setShowDeleteConfirm(false)}
            onConfirm={confirmDeleteGolongan}
          />
        )}

        <EditProfileModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          data={pegawai}
          onSave={(updated) => {
            setPegawai(updated);
            setShowEditModal(false);
          }}
        />
      </main>
    </div>
  );
}
