"use client";

import { useState } from "react";
import { dummyPegawai } from "./datapegawai";
import EditModal from "@/components/user/modals/EditModal";

export default function ProfilePegawaiPage() {
  const [openEdit, setOpenEdit] = useState(false);

  // ✅ STATE DATA PEGAWAI
  const [pegawai, setPegawai] = useState(dummyPegawai);

  // ✅ UPDATE DATA DARI MODAL
  function handleUpdate(updatedData) {
    setPegawai(prev => ({
      ...prev,
      ...updatedData,
    }));
  }

  const p = pegawai;

  return (
    <div className="max-w-6xl mx-auto pt-2 space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={p.foto}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {p.nama}
            </h2>
            <p className="text-sm text-gray-600">
              NIP: {p.nip}
            </p>
            <p className="text-sm text-gray-500">
              {p.jenis_jabatan} • Golongan {p.golongan}
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpenEdit(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded text-sm"
        >
          Edit Profile
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* DATA PRIBADI */}
        <Card title="Data Pribadi">
          <Row label="Nama" value={p.nama} />
          <Row label="Username SIA (Dosen)" value={p.username_sia} />
          <Row label="Email" value={p.email} />
          <Row label="No. Handphone" value={p.no_hp} />
          <Row label="Tempat Lahir" value={p.tempat_lahir} />
          <Row label="Tanggal Lahir" value={p.tanggal_lahir} />
          <Row label="Agama" value={p.agama} />
        </Card>

        {/* KEPEGAWAIAN */}
        <Card title="Kepegawaian">
          <Row label="Pangkat" value={p.pangkat} />
          <Row label="Golongan" value={p.golongan} />
          <Row label="Jenis Jabatan" value={p.jenis_jabatan} />
          <Row label="Jabatan" value={p.jabatan} />
          <Row label="TMT CPNS" value={p.tmt_cpns} />
          <Row label="TMT PNS" value={p.tmt_pns} />
          <Row label="No. Kartu Pegawai" value={p.no_karpeg} />
        </Card>
      </div>

      {/* ALAMAT */}
      <Card title="Alamat">
        <p className="text-sm text-gray-800 leading-relaxed">
          {p.alamat}
        </p>
      </Card>

      {/* MODAL */}
      <EditModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        data={p}
        onSave={handleUpdate}
      />
    </div>
  );
}

/* ================= COMPONENT ================= */

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold text-sky-600 mb-4">
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 font-medium text-right">
        {value || "-"}
      </span>
    </div>
  );
}
