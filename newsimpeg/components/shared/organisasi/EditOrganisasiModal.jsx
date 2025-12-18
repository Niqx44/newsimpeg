"use client";

export default function EditOrganisasiModal({ open, data, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#2b2b2b] rounded-xl p-6 w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Edit Organisasi
        </h3>

        <div className="text-gray-300 text-sm mb-6">
          (Form edit nanti diisi)
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 text-white"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
