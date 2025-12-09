"use client";

import { useEffect, useState } from "react";

export default function EditProfileModal({ open, onClose, data, onSave }) {
  if (!open) return null;

  const [form, setForm] = useState({
    nama: "",
    username_sia: "",
    email: "",
    no_hp: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
  });

  // ✅ ISI FORM SAAT MODAL DIBUKA
  useEffect(() => {
    setForm({
      nama: data.nama || "",
      username_sia: data.username_sia || "",
      email: data.email || "",
      no_hp: data.no_hp || "",
      tempat_lahir: data.tempat_lahir || "",
      tanggal_lahir: data.tanggal_lahir || "",
      alamat: data.alamat || "",
    });
  }, [data, open]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    onSave(form);          // ✅ UPDATE KE PAGE PROFIL
    alert("Profil berhasil disimpan");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-3xl shadow-lg">

        {/* HEADER */}
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-900">
            Edit Profile Pegawai
          </h3>
        </div>

        {/* FORM */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

          <Input label="Nama" name="nama" value={form.nama} onChange={handleChange} />
          <Input label="Username SIA" name="username_sia" value={form.username_sia} onChange={handleChange} />
          <Input label="Email" name="email" value={form.email} onChange={handleChange} />
          <Input label="No. Handphone" name="no_hp" value={form.no_hp} onChange={handleChange} />
          <Input label="Tempat Lahir" name="tempat_lahir" value={form.tempat_lahir} onChange={handleChange} />

          <Input
            label="Tanggal Lahir"
            type="date"
            name="tanggal_lahir"
            value={form.tanggal_lahir}
            onChange={handleChange}
          />

          <Textarea
            label="Alamat"
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
          />
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Simpan
          </button>
        </div>

      </div>
    </div>
  );
}

/* ================= FIELD ================= */

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full bg-white border border-gray-300 rounded px-3 py-2
                   text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1 md:col-span-2">
      <label className="text-gray-600">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="w-full bg-white border border-gray-300 rounded px-3 py-2
                   text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
