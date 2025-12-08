"use client";

import { Eye, KeyRound } from "lucide-react";
import StatusBadge from "./StatusBadge";
import Link from "next/link";

export default function PegawaiTable({ data, onChangeStatus, onResetPassword }) {
  return (
    <div className="bg-[#2b2b2b] p-4 rounded-xl shadow-md mt-4">
      <table className="w-full text-white">
        <thead className="border-b border-gray-400">
          <tr>
            <th className="py-3 text-left w-12">No.</th>
            <th className="py-3 text-left">NIP</th>
            <th className="py-3 text-left">Nama</th>
            <th className="py-3 text-left">Status</th>
            <th className="py-3 text-left">Detail</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="border-b border-gray-400">
              <td className="py-3">{index + 1}</td>
              <td>{item.nip}</td>
              <td>{item.nama}</td>

              {/* STATUS + UBAH */}
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <StatusBadge status={item.status} />

                  <button
                    onClick={() => onChangeStatus(item.id)}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded"
                  >
                    Ubah
                  </button>
                </div>
              </td>

              {/* DETAIL + RESET PASSWORD */}
              <td className="py-3 flex gap-4">

                {/* === IKON MATA — BUKA HALAMAN DETAIL === */}
                <Link href={`/admin/datapegawai/${item.id}`} title="Lihat Detail">
                  <Eye className="text-blue-400 hover:text-blue-600 cursor-pointer" size={20} />
                </Link>

                <button
                  title="Reset Password"
                  onClick={() => onResetPassword(item.id)}
                >
                  <KeyRound className="text-red-400 hover:text-red-600" size={20} />
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
