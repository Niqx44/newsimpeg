"use client";

export default function ConfirmDeleteModal({
  open,
  title = "Konfirmasi Hapus",
  description = "Apakah Anda yakin ingin menghapus data ini?",
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#2d2d2d] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg text-white font-semibold mb-3">
          {title}
        </h2>

        <p className="text-gray-300 mb-6">
          {description}
        </p>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
