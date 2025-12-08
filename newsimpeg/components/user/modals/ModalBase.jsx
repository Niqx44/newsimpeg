"use client";

export default function ModalBase({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl text-gray-800">
        
        {/* HEADER */}
        <div className="px-5 py-4 font-semibold text-lg">
          {title}
        </div>

        {/* CONTENT */}
        <div className="px-5 py-4 max-h-[70vh] overflow-y-auto text-sm">
          {children}
        </div>

        {/* FOOTER */}
        <div className="px-5 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-sm"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
}
