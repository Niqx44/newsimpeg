"use client";

export default function ResetPasswordModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[410px] shadow-lg text-center">

        <div className="text-orange-500 text-5xl mb-3">!</div>

        <h2 className="text-gray-700 text-xl font-semibold mb-2">Peringatan..</h2>

        <p className="text-gray-700 mb-5">
          Apakah Password User benar-benar akan direset?
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Reset!
          </button>

          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
