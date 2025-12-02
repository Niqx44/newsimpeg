"use client";
import React, { useState, useEffect } from "react";

export default function EditProfileModal({ open, onClose, onSave, data }) {
  const [form, setForm] = useState({ ...data });

  useEffect(() => {
    setForm({ ...data });
  }, [data, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#2b2b2b] p-6 rounded-xl w-full max-w-2xl">
        <h3 className="text-white text-lg font-semibold mb-4">Edit Profile Pegawai</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-auto pr-2">
          <Field label="NIP" name="nip" value={form.nip || ""} onChange={handleChange} />
          <Field label="Nama" name="nama" value={form.nama || ""} onChange={handleChange} />
          <Field label="Email" name="email" value={form.email || ""} onChange={handleChange} />
          <Field label="NO KARPEG" name="no_karpeg" value={form.no_karpeg || ""} onChange={handleChange} />
          <Field label="TMT CPNS" name="tmt_cpns" value={form.tmt_cpns || ""} onChange={handleChange} />
          <Field label="TMT PNS" name="tmt_pns" value={form.tmt_pns || ""} onChange={handleChange} />
          <Field label="Tempat Lahir" name="tempat_lahir" value={form.tempat_lahir || ""} onChange={handleChange} />
          <Field label="Tanggal Lahir" name="tanggal_lahir" value={form.tanggal_lahir || ""} onChange={handleChange} type="date" />
          <Field label="NO KTP" name="no_ktp" value={form.no_ktp || ""} onChange={handleChange} />
          <Field label="Agama" name="agama" value={form.agama || ""} onChange={handleChange} />
          <Field label="Alamat" name="alamat" value={form.alamat || ""} onChange={handleChange} />
          <Field label="NIDN / NUPTK" name="nidn" value={form.nidn || ""} onChange={handleChange} />
          <Field label="Status" name="status" value={form.status || ""} onChange={handleChange} />
          <Field label="Jenis Kepegawaian" name="jenis_kepegawaian" value={form.jenis_kepegawaian || ""} onChange={handleChange} />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white">Cancel</button>
          <button onClick={() => onSave(form)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">Save</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-gray-300 text-xs uppercase">{label}</label>
      <input name={name} value={value} onChange={onChange} type={type} className="mt-1 w-full bg-[#1f1f1f] border border-gray-700 text-white px-3 py-2 rounded" />
    </div>
  );
}
