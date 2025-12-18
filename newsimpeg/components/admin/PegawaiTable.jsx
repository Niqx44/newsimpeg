"use client";

import { Eye, KeyRound } from "lucide-react";
import StatusBadge from "./StatusBadge";
import Link from "next/link";

export default function PegawaiTable({
  data,
  page = 1,
  limit = 5,
  onChangeStatus,
  onResetPassword,
}) {
  return (
    <div className="bg-[#2b2b2b] p-4 rounded-xl mt-4">
      <table className="w-full text-white text-sm">
        <thead className="border-b border-gray-500">
          <tr>
            <th className="py-3 text-left w-12">No.</th>
            <th className="py-3 text-left">NIP</th>
            <th className="py-3 text-left">Nama</th>
            <th className="py-3 text-left">Status</th>
            <th className="py-3 text-left">Detail</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-6 text-center text-gray-400"
              >
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-600 hover:bg-[#3a3a3a]"
              >
                {/* NO */}
                <td className="py-3">
                  {(page - 1) * limit + index + 1}
                </td>

                {/* NIP */}
                <td>{item.nip}</td>

                {/* NAMA */}
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

                {/* DETAIL + RESET */}
                <td className="py-3">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/datapegawai/${item.id}`}
                      title="Lihat Detail"
                    >
                      <Eye
                        size={20}
                        className="text-blue-400 hover:text-blue-600 cursor-pointer"
                      />
                    </Link>

                    <button
                      title="Reset Password"
                      onClick={() => onResetPassword(item.id)}
                    >
                      <KeyRound
                        size={20}
                        className="text-red-400 hover:text-red-600"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
