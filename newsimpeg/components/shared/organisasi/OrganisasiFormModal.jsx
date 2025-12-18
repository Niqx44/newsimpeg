"use client";

import { useEffect, useState } from "react";

export default function OrganisasiFormModal({
  open,
  initialData,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    kode: "",
    nama: "",
    eselon: "",
    induk: "",
    pimpinan: "",
    jabatan_pimpinan: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        kode: initialData.kode || "",
        nama: initialData.nama || "",
        eselon: initialData.eselon || "",
        induk: initialData.induk || "",
        pimpinan: initialData.pimpinan || "",
        jabatan_pimpinan: initialData.jabatan_pimpinan || "",
      });
    }
  }, [initialData]);

  if (!open) return null;

  const Input = ({ label, name, placeholder }) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-300">{label}</label>
      <input
        name={name}
        value={form[name]}
        onChange={e => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder}
        className="
          px-3 py-2 rounded-lg
          bg-[#1f1f1f]
          border border-gray-600
          text-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-600
        "
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#2b2b2b] rounded-2xl w-full max-w-2xl shadow-xl">
        {/* HEADER */}
        <div className="px-6 pt-7">
          <h3 className="text-lg font-semibold text-white">
            {initialData ? "Edit Organisasi" : "Tambah Organisasi"}
          </h3>
        </div>

        {/* BODY */}
        <div className="px-6 py-5 grid grid-cols-2 gap-4">
          <Input
            label="Kode Organisasi"
            name="kode"
            placeholder="Contoh: 001036"
          />

          <Input
            label="Eselon"
            name="eselon"
            placeholder="Contoh: I"
          />

          <div className="col-span-2">
            <Input
              label="Nama Organisasi / Unit Kerja"
              name="nama"
              placeholder="Universitas Negeri Makassar"
            />
          </div>

          <div className="col-span-2">
            <Input
              label="Organisasi Induk"
              name="induk"
              placeholder="Universitas Negeri Makassar"
            />
          </div>

          <Input
            label="Nama Pimpinan"
            name="pimpinan"
            placeholder="Prof. Dr. ..."
          />

          <Input
            label="Jabatan Pimpinan"
            name="jabatan_pimpinan"
            placeholder="Rektor"
          />
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onSave(form);
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
