// app/admin/datapegawai/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import TabsHeader from "@/components/admin/detailpegawai/TabsHeader";
import ProfileTab from "@/components/admin/detailpegawai/ProfileTab";
import DetailPegawaiTable from "@/components/admin/detailpegawai/DetailPegawaiTable";
import GenericModal from "@/components/admin/detailpegawai/GenericModal";
import EditProfileModal from "@/components/admin/detailpegawai/EditProfileModal";

const defaultPerPage = 5;

export default function DetailPage() {
  const { id } = useParams();

  const [pegawai, setPegawai] = useState(null); // null loading, "NOT_FOUND"
  const [activeTab, setActiveTab] = useState("profile");

  // Generic modal state (reused)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFields, setModalFields] = useState([]);
  const [modalForm, setModalForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [currentListKey, setCurrentListKey] = useState(null); // which riwayat currently editing (golongan/jabatan/..)

  // Edit profile modal
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Dummy data for all riwayat (init with 1 sample each)
  const [golongan, setGolongan] = useState([
    { id: 1, jenis_kp: "KP Reguler", golongan: "III/c", tmt: "2017-04-01", masa_kerja: "07 Tahun 04 Bulan", file: null },
  ]);
  const [jabatan, setJabatan] = useState([
    { id: 1, jenis_jabatan: "Struktural", jabatan: "Kepala Bagian", kum: "—", tmt: "2020-01-01", file: null },
  ]);
  const [pendidikan, setPendidikan] = useState([
    { id: 1, jenjang: "S1", lembaga: "Universitas X", prodi: "Teknik", tanggal_lulus: "2008-07-01", no_ijazah: "ABC123", ijazah_cpns: "ya", ijazah_terakhir: "ya", file: null },
  ]);
  const [diklat, setDiklat] = useState([
    { id: 1, jenis_diklat: "Fungsional", diklat: "Pelatihan A", waktu: "2021-05", penyelenggara: "Lembaga A", file: null },
  ]);
  const [riset, setRiset] = useState([
    { id: 1, publikasi: "Jurnal X", tingkat: "Nasional", jenis: "Artikel", instansi: "Univ", sumber_dana: "Internal", keterangan: "", waktu: "2019", file: null },
  ]);
  const [penghargaan, setPenghargaan] = useState([
    { id: 1, penghargaan: "Satya Lencana", tingkat: "Nasional", penyelenggara: "Kementerian", tanggal: "2018-12-01", keterangan: "", file: null },
  ]);
  const [kgb, setKgb] = useState([
    { id: 1, tanggal_kgb: "2023-01-01", masa_kerja: "8 Tahun", file: null },
  ]);
  const [arsip, setArsip] = useState([
    { id: 1, jenis_arsip: "SK Pengangkatan", file: null },
  ]);

  // loader pegawai.json
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/data/pegawai.json");
        const list = await res.json();
        const found = list.find((p) => String(p.id) === String(id));
        if (!mounted) return;
        setPegawai(found || "NOT_FOUND");
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setPegawai("NOT_FOUND");
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  if (pegawai === null) return <div className="p-6 text-gray-200">Loading...</div>;
  if (pegawai === "NOT_FOUND") return <div className="flex items-center justify-center h-[70vh] text-black text-lg font-semibold">❌ Data Pegawai dengan ID {id} tidak ditemukan.</div>;

  // helper: open generic modal for a given list
  function openModalForList(listKey, mode = "add", row = null, columns = [], title = "Form") {
    setCurrentListKey(listKey);
    setModalTitle(title);
    setModalFields(columns);

    if (mode === "edit" && row) {
      setEditingId(row.id);
      setModalForm({ ...row });
    } else {
      setEditingId(null);
      // initialize empty form based on columns keys
      const empty = {};
      columns.forEach(c => { empty[c.key] = c.type === "file" ? null : ""; });
      setModalForm(empty);
    }

    setModalOpen(true);
  }

  function handleSaveModal(formData) {
    // route to the right list based on currentListKey
    const setterMap = {
      golongan: setGolongan,
      jabatan: setJabatan,
      pendidikan: setPendidikan,
      diklat: setDiklat,
      riset: setRiset,
      penghargaan: setPenghargaan,
      kgb: setKgb,
      arsip: setArsip,
    };
    const stateMap = {
      golongan, jabatan, pendidikan, diklat, riset, penghargaan, kgb, arsip
    };

    const setter = setterMap[currentListKey];
    const current = stateMap[currentListKey] ?? [];

    if (!setter) {
      console.warn("No setter for", currentListKey);
      setModalOpen(false);
      return;
    }

    if (editingId) {
      setter(prev => prev.map(item => item.id === editingId ? { ...item, ...formData } : item));
    } else {
      setter(prev => [...prev, { id: Date.now(), ...formData }]);
    }

    setModalOpen(false);
    setEditingId(null);
    setModalForm({});
  }

  function handleDelete(listKey, idToDelete) {
    const setterMap = {
      golongan: setGolongan,
      jabatan: setJabatan,
      pendidikan: setPendidikan,
      diklat: setDiklat,
      riset: setRiset,
      penghargaan: setPenghargaan,
      kgb: setKgb,
      arsip: setArsip,
    };
    const setter = setterMap[listKey];
    if (!setter) return;
    setter(prev => prev.filter(i => i.id !== idToDelete));
  }

  function handleViewFile(row) {
    if (!row.file) {
      alert("Tidak ada file (dummy).");
      return;
    }
    window.open(row.file.url, "_blank");
  }

  /* Column definitions for each riwayat */
  const columnsDef = {
    golongan: [
      { label: "No", key: "no", width: "w-12", align: "center" },
      { label: "Jenis KP", key: "jenis_kp" },
      { label: "Golongan", key: "golongan" },
      { label: "TMT", key: "tmt" },
      { label: "Masa Kerja", key: "masa_kerja" },
      { label: "File", key: "file", align: "center" },
      { label: "Action", key: "action", align: "center" },
    ],
    jabatan: [
      { label: "No", key: "no", align: "center" },
      { label: "Jenis Jabatan", key: "jenis_jabatan" },
      { label: "Jabatan", key: "jabatan" },
      { label: "KUM", key: "kum" },
      { label: "TMT", key: "tmt" },
      { label: "File", key: "file", align: "center" },
      { label: "Action", key: "action", align: "center" },
    ],
    pendidikan: [
      { label: "No", key: "no", align: "center" },
      { label: "Jenjang", key: "jenjang" },
      { label: "Lembaga", key: "lembaga" },
      { label: "Prodi/Jurusan", key: "prodi" },
      { label: "Tanggal Lulus", key: "tanggal_lulus" },
      { label: "No Ijazah", key: "no_ijazah" },
      { label: "Ijazah CPNS", key: "ijazah_cpns" },
      { label: "Ijazah Terakhir", key: "ijazah_terakhir" },
      { label: "File", key: "file", align: "center" },
      { label: "Action", key: "action", align: "center" },
    ],
    diklat: [
      { label: "No", key: "no", align: "center" },
      { label: "Jenis Diklat", key: "jenis_diklat" },
      { label: "Diklat", key: "diklat" },
      { label: "Waktu", key: "waktu" },
      { label: "Penyelenggara", key: "penyelenggara" },
      { label: "File", key: "file", align: "center" },
      { label: "Action", key: "action", align: "center" },
    ],
    riset: [
      { label: "No", key: "no", align: "center" },
      { label: "Publikasi", key: "publikasi" },
      { label: "Tingkat", key: "tingkat" },
      { label: "Jenis", key: "jenis" },
      { label: "Instansi", key: "instansi" },
      { label: "Sumber Dana", key: "sumber_dana" },
      { label: "Keterangan", key: "keterangan" },
      { label: "Waktu", key: "waktu" },
      { label: "File", key: "file", align: "center" },
      { label: "Action", key: "action", align: "center" },
    ],
    penghargaan: [
      { label: "No", key: "no", align: "center" },
      { label: "Penghargaan", key: "penghargaan" },
      { label: "Tingkat", key: "tingkat" },
      { label: "Penyelenggara", key: "penyelenggara" },
      { label: "Tanggal", key: "tanggal" },
      { label: "Keterangan", key: "keterangan" },
      { label: "File", key: "file", align: "center" },
      { label: "Action", key: "action", align: "center" },
    ],
    kgb: [
      { label: "No", key: "no", align: "center" },
      { label: "Tanggal KGB", key: "tanggal_kgb" },
      { label: "Masa Kerja", key: "masa_kerja" },
      { label: "File", key: "file", align: "center" },
      { label: "Action", key: "action", align: "center" },
    ],
    arsip: [
      { label: "No", key: "no", align: "center" },
      { label: "Jenis Arsip", key: "jenis_arsip" },
      { label: "File", key: "file", align: "center" },
      { label: "Action", key: "action", align: "center" },
    ],
  };

  // helper to map listKey -> state & setter
  const listStateMap = {
    golongan: [golongan, setGolongan],
    jabatan: [jabatan, setJabatan],
    pendidikan: [pendidikan, setPendidikan],
    diklat: [diklat, setDiklat],
    riset: [riset, setRiset],
    penghargaan: [penghargaan, setPenghargaan],
    kgb: [kgb, setKgb],
    arsip: [arsip, setArsip],
  };

  // open add for specific list
  function openAdd(listKey) {
    const cols = columnsDef[listKey];
    // build fields for modal from cols (skip action/no/file -> file kept as file)
    const fields = cols
      .filter(c => !["no", "action"].includes(c.key))
      .map(c => {
        // choose type: if key includes 'tanggal' or 'tgl' -> date; if 'file' -> file; else text
        let type = "text";
        if (c.key === "file") type = "file";
        if (/tanggal|tgl|waktu|tmt/i.test(c.key)) type = "date";
        return { label: c.label, key: c.key, type };
      });

    openModalForList(listKey, "add", null, fields, `Tambah ${listKey}`);
  }

  // open edit for specific list
  function openEdit(listKey, row) {
    const cols = columnsDef[listKey];
    const fields = cols
      .filter(c => !["no", "action"].includes(c.key))
      .map(c => {
        let type = "text";
        if (c.key === "file") type = "file";
        if (/tanggal|tgl|waktu|tmt/i.test(c.key)) type = "date";
        return { label: c.label, key: c.key, type };
      });
    openModalForList(listKey, "edit", row, fields, `Edit ${listKey}`);
  }

  // delete wrapper
  function deleteHandler(listKey, idToDelete) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    handleDelete(listKey, idToDelete);
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-black mb-4">NIP : <span className="text-black">{pegawai.nip}</span></h2>

        <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="bg-[#2b2b2b] p-6 rounded-xl shadow-md">
          {activeTab === "profile" && <ProfileTab pegawai={pegawai} onEdit={() => setShowProfileModal(true)} />}

          {activeTab === "golongan" && (
            <DetailPegawaiTable
              columns={columnsDef.golongan}
              data={golongan}
              pageSize={defaultPerPage}
              openAdd={() => openAdd("golongan")}
              onEdit={(row) => openEdit("golongan", row)}
              onDelete={(id) => deleteHandler("golongan", id)}
              onViewFile={handleViewFile}
            />
          )}

          {activeTab === "jabatan" && (
            <DetailPegawaiTable
              columns={columnsDef.jabatan}
              data={jabatan}
              pageSize={defaultPerPage}
              openAdd={() => openAdd("jabatan")}
              onEdit={(row) => openEdit("jabatan", row)}
              onDelete={(id) => deleteHandler("jabatan", id)}
              onViewFile={handleViewFile}
            />
          )}

          {activeTab === "pendidikan" && (
            <DetailPegawaiTable
              columns={columnsDef.pendidikan}
              data={pendidikan}
              pageSize={defaultPerPage}
              openAdd={() => openAdd("pendidikan")}
              onEdit={(row) => openEdit("pendidikan", row)}
              onDelete={(id) => deleteHandler("pendidikan", id)}
              onViewFile={handleViewFile}
            />
          )}

          {activeTab === "diklat" && (
            <DetailPegawaiTable
              columns={columnsDef.diklat}
              data={diklat}
              pageSize={defaultPerPage}
              openAdd={() => openAdd("diklat")}
              onEdit={(row) => openEdit("diklat", row)}
              onDelete={(id) => deleteHandler("diklat", id)}
              onViewFile={handleViewFile}
            />
          )}

          {activeTab === "riset" && (
            <DetailPegawaiTable
              columns={columnsDef.riset}
              data={riset}
              pageSize={defaultPerPage}
              openAdd={() => openAdd("riset")}
              onEdit={(row) => openEdit("riset", row)}
              onDelete={(id) => deleteHandler("riset", id)}
              onViewFile={handleViewFile}
            />
          )}

          {activeTab === "penghargaan" && (
            <DetailPegawaiTable
              columns={columnsDef.penghargaan}
              data={penghargaan}
              pageSize={defaultPerPage}
              openAdd={() => openAdd("penghargaan")}
              onEdit={(row) => openEdit("penghargaan", row)}
              onDelete={(id) => deleteHandler("penghargaan", id)}
              onViewFile={handleViewFile}
            />
          )}

          {activeTab === "kgb" && (
            <DetailPegawaiTable
              columns={columnsDef.kgb}
              data={kgb}
              pageSize={defaultPerPage}
              openAdd={() => openAdd("kgb")}
              onEdit={(row) => openEdit("kgb", row)}
              onDelete={(id) => deleteHandler("kgb", id)}
              onViewFile={handleViewFile}
            />
          )}

          {activeTab === "arsip" && (
            <DetailPegawaiTable
              columns={columnsDef.arsip}
              data={arsip}
              pageSize={defaultPerPage}
              openAdd={() => openAdd("arsip")}
              onEdit={(row) => openEdit("arsip", row)}
              onDelete={(id) => deleteHandler("arsip", id)}
              onViewFile={handleViewFile}
            />
          )}

          {/* Karir / placeholder */}
          {activeTab === "karir" && <div className="text-gray-300">Karir (placeholder)</div>}
        </div>

        {/* Generic modal used for all riwayat */}
        <GenericModal
          title={modalTitle}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveModal}
          fields={modalFields}
          form={modalForm}
          setForm={setModalForm}
        />

        {/* Edit profile modal */}
        <EditProfileModal
          open={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          data={pegawai}
          onSave={(updated) => {
            setPegawai(updated);
            setShowProfileModal(false);
          }}
        />
      </main>
    </div>
  );
}
