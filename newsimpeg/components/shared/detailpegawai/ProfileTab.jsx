// components/detailpegawai/ProfileTab.jsx
"use client";

import React from "react";

export default function ProfileTab({ pegawai, onEdit }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Profile Pegawai</h3>
        <button onClick={() => onEdit(pegawai)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">Edit Profile</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Info label="NIP" value={pegawai.nip} />
        <Info label="Nama" value={pegawai.nama} />
        <Info label="Email" value={pegawai.email} />
        <Info label="NO KARPEG" value={pegawai.no_karpeg} />
        <Info label="TMT CPNS" value={pegawai.tmt_cpns} />
        <Info label="TMT PNS" value={pegawai.tmt_pns} />
        <Info label="Tempat Lahir" value={pegawai.tempat_lahir} />
        <Info label="Tanggal Lahir" value={pegawai.tanggal_lahir} />
        <Info label="NO KTP" value={pegawai.no_ktp} />
        <Info label="Agama" value={pegawai.agama} />
        <Info label="Alamat" value={pegawai.alamat} />
        <Info label="NIDN / NUPTK" value={pegawai.nidn} />
        <Info label="Status" value={pegawai.status} />
        <Info label="Jenis Kepegawaian" value={pegawai.jenis_kepegawaian} />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-[#1f1f1f] p-4 rounded-lg border border-gray-700">
      <p className="text-gray-400 text-xs uppercase">{label}</p>
      <p className="text-white font-medium mt-1">{value ?? "-"}</p>
    </div>
  );
}
