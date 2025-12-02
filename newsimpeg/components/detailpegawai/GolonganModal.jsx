"use client";
import React from "react";

export default function GolonganModal({ editingId, form, setForm, onClose, onSave, handleFile }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#2b2b2b] p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 className="text-white text-lg font-semibold mb-4">{editingId ? "Edit Golongan" : "Tambah Golongan"}</h3>

        <div className="flex flex-col gap-3">
          <label className="text-gray-300 text-xs">Jenis KP</label>
          <input value={form.jenis_kp} onChange={(e) => setForm((s) => ({ ...s, jenis_kp: e.target.value }))} className="p-2 rounded bg-[#1f1f1f] text-white border border-gray-600" />

          <label className="text-gray-300 text-xs">Golongan</label>
          <input value={form.golongan} onChange={(e) => setForm((s) => ({ ...s, golongan: e.target.value }))} className="p-2 rounded bg-[#1f1f1f] text-white border border-gray-600" />

          <label className="text-gray-300 text-xs">TMT</label>
          <input value={form.tmt} onChange={(e) => setForm((s) => ({ ...s, tmt: e.target.value }))} className="p-2 rounded bg-[#1f1f1f] text-white border border-gray-600" />

          <label className="text-gray-300 text-xs">Masa Kerja</label>
          <input value={form.masa_kerja} onChange={(e) => setForm((s) => ({ ...s, masa_kerja: e.target.value }))} className="p-2 rounded bg-[#1f1f1f] text-white border border-gray-600" />

          <div>
            <label className="text-gray-300 text-xs">File (PDF/JPG)</label>

            <label htmlFor="upload-file" className="mt-1 flex items-center justify-center w-full border border-gray-600 bg-[#1f1f1f] text-gray-300 px-3 py-2 rounded cursor-pointer hover:bg-[#252525] transition">
              {form.file ? form.file.name : "Pilih File"}
            </label>

            <input id="upload-file" type="file" accept=".pdf,image/*" onChange={handleFile} className="hidden" />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Batal</button>
          <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded">Simpan</button>
        </div>
      </div>
    </div>
  );
}
