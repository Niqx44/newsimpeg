"use client";

import { useEffect, useState } from "react";
import OrganisasiTable from "@/components/shared/organisasi/OrganisasiTable";

export default function UserOrganisasiPage() {
  const [data, setData] = useState([]);
  const [showStruktur, setShowStruktur] = useState(false);

  useEffect(() => {
    fetch("/data/organisasi.json")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-3">
      <h2 className="text-xl font-semibold text-black mb-4">
        Data Organisasi Unit Kerja
      </h2>

      <div className="mb-6 rounded-sm bg-[#2b2b2b]">
        <button
          onClick={() => setShowStruktur(!showStruktur)}
          className="text-white py-2 px-4 font-semibold hover:underline"
        >
          {showStruktur
            ? "Tutup Struktur Organisasi"
            : "Klik Untuk Lihat Struktur Organisasi"}
        </button>

        {showStruktur && (
          <div className="border rounded--b-sm p-4 bg-white overflow-auto">
            <img
              src="/strukturorganisasi.png"
              alt="Struktur Organisasi"
              className="max-w-3xl w-full mx-auto"
            />
          </div>
        )}
      </div>

      <div className="bg-[#2b2b2b] p-6 rounded-xl">
        <OrganisasiTable data={data} />
      </div>
    </main>
  );
}
