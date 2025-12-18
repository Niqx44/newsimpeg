"use client";

import { useEffect, useState } from "react";

/* ================= INPUT COMPONENT ================= */
function Input({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-300">{label}</label>
      <input
        value={value}
        onChange={onChange}
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
}

/* ================= MODAL ================= */
export default function PeraturanFormModal({
  open,
  initialData,
  onClose,
  onSave,
}) {
  const [judul, setJudul] = useState("");
  const [peraturan, setPeraturan] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [error, setError] = useState("");

  /* ================= INIT ================= */
  useEffect(() => {
    if (!open) return;

    setJudul(initialData?.judul || "");
    setPeraturan(initialData?.peraturan || "");
    setFile(null);
    setFileUrl(initialData?.fileUrl || "");
    setError("");
  }, [open, initialData]);

  if (!open) return null;

  /* ================= FILE ================= */
  function handleFileChange(e) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 100 * 1024 * 1024) {
      setError("Ukuran file maksimal 100 MB");
      e.target.value = "";
      return;
    }

    const url = URL.createObjectURL(selected);

    setError("");
    setFile(selected);
    setFileUrl(url);
  }

  function handleSubmit() {
    onSave({
      judul,
      peraturan,
      file,
      fileUrl,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#2b2b2b] rounded-2xl w-full max-w-xl shadow-xl">

        {/* HEADER */}
        <div className="px-6 pt-7">
          <h3 className="text-lg font-semibold text-white">
            {initialData ? "Edit Peraturan" : "Tambah Peraturan"}
          </h3>
        </div>

        {/* BODY */}
        <div className="px-6 py-5 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Input
              label="Judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Masa Persiapan Pensiun"
            />
          </div>

          <div className="col-span-2">
            <Input
              label="Peraturan"
              value={peraturan}
              onChange={(e) => setPeraturan(e.target.value)}
              placeholder="PERATURAN BKN NO 2 TAHUN 2019"
            />
          </div>

          {/* FILE */}
          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-sm text-gray-300">
              File (PDF / DOC, max 100MB)
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="
                px-3 py-2 rounded-lg
                bg-[#1f1f1f]
                border border-gray-600
                text-white
              "
            />

            {file && (
              <span className="text-xs text-gray-400">
                File dipilih: {file.name}
              </span>
            )}

            {error && (
              <span className="text-xs text-red-400">
                {error}
              </span>
            )}
          </div>
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
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
