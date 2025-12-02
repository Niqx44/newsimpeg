"use client";

export default function ViewDetailModal({ open, onClose, pegawai }) {
  if (!open || !pegawai) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#2b2b2b] w-[600px] rounded-lg p-6 shadow-xl text-white">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Detail Pegawai</h2>
          <button
            className="text-gray-400 hover:text-white text-xl"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* ISI DATA */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><b>NIP:</b> {pegawai.nip}</p>
          <p><b>Nama:</b> {pegawai.nama}</p>
          <p><b>Status:</b> {pegawai.status}</p>
          <p><b>Email:</b> {pegawai.email || "-"}</p>
          <p><b>NO KARPEG:</b> {pegawai.no_karpeg || "-"}</p>
          <p><b>TMT CPNS:</b> {pegawai.tmt_cpns || "-"}</p>
          <p><b>TMT PNS:</b> {pegawai.tmt_pns || "-"}</p>
          <p><b>Tempat Lahir:</b> {pegawai.tempat_lahir || "-"}</p>
          <p><b>Tanggal Lahir:</b> {pegawai.tanggal_lahir || "-"}</p>
          <p><b>NO KTP:</b> {pegawai.no_ktp || "-"}</p>
          <p><b>Agama:</b> {pegawai.agama || "-"}</p>
          <p><b>Alamat:</b> {pegawai.alamat || "-"}</p>
          <p><b>NIDN / NUPTK:</b> {pegawai.nidn || "-"}</p>
        </div>

        {/* FOOTER */}
        <div className="mt-6 text-right">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
