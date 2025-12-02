// components/detailpegawai/GenericModal.jsx
"use client";

import React from "react";

export default function GenericModal({ title = "Form", open, onClose, onSave, fields = [], form = {}, setForm }) {
  if (!open) return null;

  const handleChange = (name, e) => {
    if (e?.target?.files) {
      const f = e.target.files[0];
      if (!f) return setForm((s) => ({ ...s, [name]: null }));
      const url = URL.createObjectURL(f);
      setForm((s) => ({ ...s, [name]: { name: f.name, url } }));
    } else {
      setForm((s) => ({ ...s, [name]: e?.target?.value ?? e }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#2b2b2b] p-6 rounded-lg w-full max-w-2xl">
        <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-auto pr-2">
          {fields.map((f) => {
            const value = form[f.key];
            if (f.type === "file") {
              return (
                <div key={f.key}>
                  <label className="text-gray-300 text-xs">{f.label}</label>
                  <label htmlFor={`file-${f.key}`} className="mt-1 flex items-center justify-between w-full border border-gray-600 bg-[#1f1f1f] text-gray-300 px-3 py-2 rounded cursor-pointer hover:bg-[#252525]">
                    {value ? value.name : "Pilih File"}
                    <span className="text-xs text-gray-400">Browse</span>
                  </label>
                  <input id={`file-${f.key}`} type="file" accept={f.accept || "*"} onChange={(e) => handleChange(f.key, e)} className="hidden" />
                  {value && <div className="text-gray-300 text-xs mt-1">Terpilih: {value.name}</div>}
                </div>
              );
            }

            if (f.type === "textarea") {
              return (
                <div key={f.key}>
                  <label className="text-gray-300 text-xs">{f.label}</label>
                  <textarea value={form[f.key] ?? ""} onChange={(e) => handleChange(f.key, e)} className="mt-1 w-full bg-[#1f1f1f] border border-gray-700 text-white px-3 py-2 rounded" />
                </div>
              );
            }

            return (
              <div key={f.key}>
                <label className="text-gray-300 text-xs">{f.label}</label>
                <input
                  value={form[f.key] ?? ""}
                  onChange={(e) => handleChange(f.key, e)}
                  type={f.type || "text"}
                  className="mt-1 w-full bg-[#1f1f1f] border border-gray-700 text-white px-3 py-2 rounded"
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Batal</button>
          <button onClick={() => onSave(form)} className="px-4 py-2 bg-blue-600 text-white rounded">Simpan</button>
        </div>
      </div>
    </div>
  );
}
