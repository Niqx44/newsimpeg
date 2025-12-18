"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import TabsHeader from "./TabsHeader";
import ProfileTab from "./ProfileTab";
import DetailPegawaiTable from "./DetailPegawaiTable";
import GenericModal from "./GenericModal";
import EditProfileModal from "./EditProfileModal";

const defaultPerPage = 5;

export default function DetailPegawaiPage({ mode = "admin", userId }) {
  const params = useParams();
  const id = mode === "admin" ? params.id : userId;

  const [pegawai, setPegawai] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFields, setModalFields] = useState([]);
  const [modalForm, setModalForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [currentListKey, setCurrentListKey] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [golongan, setGolongan] = useState([]);
  const [jabatan, setJabatan] = useState([]);
  const [pendidikan, setPendidikan] = useState([]);
  const [diklat, setDiklat] = useState([]);
  const [riset, setRiset] = useState([]);
  const [penghargaan, setPenghargaan] = useState([]);
  const [kgb, setKgb] = useState([]);
  const [arsip, setArsip] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch("/data/pegawai.json");
        const list = await res.json();
        const found = list.find((p) => String(p.id) === String(id));
        if (mounted) setPegawai(found || "NOT_FOUND");
      } catch {
        if (mounted) setPegawai("NOT_FOUND");
      }
    }

    load();
    return () => (mounted = false);
  }, [id]);

  if (pegawai === null)
    return <div className="p-6">Loading...</div>;

  if (pegawai === "NOT_FOUND")
    return (
      <div className="flex justify-center items-center h-[70vh] font-semibold text-black">
        ❌ Data Pegawai tidak ditemukan
      </div>
    );

  const columnsDef = {
    golongan: [
      { label: "No", key: "no" },
      { label: "Jenis KP", key: "jenis_kp" },
      { label: "Golongan", key: "golongan" },
      { label: "TMT", key: "tmt" },
      { label: "Masa Kerja", key: "masa_kerja" },
      { label: "File", key: "file" },
      { label: "Action", key: "action" },
    ],
    jabatan: [
      { label: "No", key: "no" },
      { label: "Jenis Jabatan", key: "jenis_jabatan" },
      { label: "Jabatan", key: "jabatan" },
      { label: "KUM", key: "kum" },
      { label: "TMT", key: "tmt" },
      { label: "File", key: "file" },
      { label: "Action", key: "action" },
    ],
    pendidikan: [
      { label: "No", key: "no" },
      { label: "Jenjang", key: "jenjang" },
      { label: "Lembaga", key: "lembaga" },
      { label: "Prodi", key: "prodi" },
      { label: "Tanggal Lulus", key: "tanggal_lulus" },
      { label: "No Ijazah", key: "no_ijazah" },
      { label: "Ijazah CPNS", key: "ijazah_cpns" },
      { label: "Ijazah Terakhir", key: "ijazah_terakhir" },
      { label: "File", key: "file" },
      { label: "Action", key: "action" },
    ],
    diklat: [
      { label: "No", key: "no" },
      { label: "Jenis Diklat", key: "jenis_diklat" },
      { label: "Diklat", key: "diklat" },
      { label: "Waktu", key: "waktu" },
      { label: "Penyelenggara", key: "penyelenggara" },
      { label: "File", key: "file" },
      { label: "Action", key: "action" },
    ],
    riset: [
      { label: "No", key: "no" },
      { label: "Publikasi", key: "publikasi" },
      { label: "Tingkat", key: "tingkat" },
      { label: "Jenis", key: "jenis" },
      { label: "Instansi", key: "instansi" },
      { label: "Sumber Dana", key: "sumber_dana" },
      { label: "Keterangan", key: "keterangan" },
      { label: "Waktu", key: "waktu" },
      { label: "File", key: "file" },
      { label: "Action", key: "action" },
    ],
    penghargaan: [
      { label: "No", key: "no" },
      { label: "Penghargaan", key: "penghargaan" },
      { label: "Tingkat", key: "tingkat" },
      { label: "Penyelenggara", key: "penyelenggara" },
      { label: "Tanggal", key: "tanggal" },
      { label: "Keterangan", key: "keterangan" },
      { label: "File", key: "file" },
      { label: "Action", key: "action" },
    ],
    kgb: [
      { label: "No", key: "no" },
      { label: "Tanggal KGB", key: "tanggal_kgb" },
      { label: "Masa Kerja", key: "masa_kerja" },
      { label: "File", key: "file" },
      { label: "Action", key: "action" },
    ],
    arsip: [
      { label: "No", key: "no" },
      { label: "Jenis Arsip", key: "jenis_arsip" },
      { label: "File", key: "file" },
      { label: "Action", key: "action" },
    ],
  };

  function openAdd(listKey) {
    const fields = columnsDef[listKey]
      .filter((c) => !["no", "action"].includes(c.key))
      .map((c) => ({
        label: c.label,
        key: c.key,
        type:
          c.key === "file"
            ? "file"
            : /tanggal|tmt|waktu/i.test(c.key)
            ? "date"
            : "text",
      }));

    setCurrentListKey(listKey);
    setModalFields(fields);
    setModalTitle(`Tambah ${listKey}`);
    setModalForm({});
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(listKey, row) {
    openAdd(listKey);
    setModalForm(row);
    setEditingId(row.id);
    setModalTitle(`Edit ${listKey}`);
  }

  function handleSave(formData) {
    const map = {
      golongan: setGolongan,
      jabatan: setJabatan,
      pendidikan: setPendidikan,
      diklat: setDiklat,
      riset: setRiset,
      penghargaan: setPenghargaan,
      kgb: setKgb,
      arsip: setArsip,
    };

    map[currentListKey]((prev) =>
      editingId
        ? prev.map((i) => (i.id === editingId ? { ...i, ...formData } : i))
        : [...prev, { id: Date.now(), ...formData }]
    );

    setModalOpen(false);
  }

  function handleDelete(listKey, id) {
    const map = {
      golongan: setGolongan,
      jabatan: setJabatan,
      pendidikan: setPendidikan,
      diklat: setDiklat,
      riset: setRiset,
      penghargaan: setPenghargaan,
      kgb: setKgb,
      arsip: setArsip,
    };
    map[listKey]((prev) => prev.filter((i) => i.id !== id));
  }

  function handleViewFile(row) {
    if (!row.file) return alert("Tidak ada file");
    window.open(row.file.url, "_blank");
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-3">
      <h2 className="text-xl font-semibold mb-4 text-black">
        NIP : {pegawai.nip}
      </h2>

      <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="bg-[#2b2b2b] p-6 rounded-xl shadow-md">
        {activeTab === "profile" && (
          <ProfileTab pegawai={pegawai} onEdit={() => setShowProfileModal(true)} />
        )}

        {Object.keys(columnsDef).map(
          (key) =>
            activeTab === key && (
              <DetailPegawaiTable
                key={key}
                columns={columnsDef[key]}
                data={
                  {
                    golongan,
                    jabatan,
                    pendidikan,
                    diklat,
                    riset,
                    penghargaan,
                    kgb,
                    arsip,
                  }[key]
                }
                pageSize={defaultPerPage}
                openAdd={() => openAdd(key)}
                onEdit={(row) => openEdit(key, row)}
                onDelete={(id) => handleDelete(key, id)}
                onViewFile={handleViewFile}
              />
            )
        )}
      </div>

      <GenericModal
        open={modalOpen}
        title={modalTitle}
        fields={modalFields}
        form={modalForm}
        setForm={setModalForm}
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
      />

      <EditProfileModal
        open={showProfileModal}
        data={pegawai}
        onClose={() => setShowProfileModal(false)}
        onSave={(updatedData) =>
          setPegawai((prev) => ({
            ...prev,
            ...updatedData,
          }))
        }
      />
    </main>
  );
}
