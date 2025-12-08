"use client";

export default function ConfirmActionModal({ action, onClose, onConfirm }) {
  if (!action) return null;

  const map = {
    approve: "Approve data ini?",
    decline: "Tolak data ini?",
    notify: "Kirim notifikasi ke pegawai?",
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#2d2d2d] p-6 rounded-lg w-full max-w-md">
        <p className="text-gray-200 mb-5">{map[action.type]}</p>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">
            Batal
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 rounded">
            Ya
          </button>
        </div>
      </div>
    </div>
  );
}
