"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahPegawaiPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nip: "",
    nama: "",
    email: "",
    no_karpeg: "",
    tmt_cpns: "",
    tmt_pns: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    no_ktp: "",
    agama: "",
    alamat: "",
    status: "",
    jenis_kepegawaian: "",
    nidn: "",
    foto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Data Pegawai Berhasil Disimpan (dummy)");
  };

  const fields = [
    { label: "NIP", name: "nip" },
    { label: "Nama", name: "nama" },
    { label: "Email", name: "email" },
    { label: "NO KARPEG", name: "no_karpeg" },
    { label: "TMT CPNS", name: "tmt_cpns" },
    { label: "TMT PNS", name: "tmt_pns" },
    { label: "Tempat Lahir", name: "tempat_lahir" },
    { label: "Tanggal Lahir", name: "tanggal_lahir", type: "date" },
    { label: "NO KTP", name: "no_ktp" },
    { label: "Agama", name: "agama" },
    { label: "Alamat", name: "alamat" },
    { label: "NIDN / NUPTK", name: "nidn" },
  ];

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">

        {/* PAGE TITLE */}
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 mt-2">
          Tambah Data Pegawai
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#2b2b2b] p-8 rounded-xl shadow-xl w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

            {fields.map((item, i) =>
              item.name === "tanggal_lahir" ? (
                <div key={i} className="flex flex-col">
                  <label className="text-gray-200 mb-1">{item.label}</label>

                  {/* CUSTOM DATE INPUT */}
                  <div className="relative">
                    <input
                      type="date"
                      name={item.name}
                      value={formData[item.name]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white
                                 focus:border-blue-500 cursor-pointer"
                    />

                    {/* ICON */}
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10m-11 8h12a2 2 0 002-2V7a2 2 0 
                             00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={i} className="flex flex-col">
                  <label className="text-gray-200 mb-1">{item.label}</label>
                  <input
                    type={item.type || "text"}
                    name={item.name}
                    className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white"
                    value={formData[item.name]}
                    onChange={handleChange}
                  />
                </div>
              )
            )}

            {/* STATUS */}
            <div className="flex flex-col">
              <label className="text-gray-200 mb-1">Status</label>
              <select
                name="status"
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">-- Pilih Status Pegawai --</option>
                <option value="AKTIF">AKTIF</option>
                <option value="TIDAK AKTIF">TIDAK AKTIF</option>
              </select>
            </div>

            {/* JENIS KEPEGAWAIAN */}
            <div className="flex flex-col">
              <label className="text-gray-200 mb-1">Jenis Kepegawaian</label>
              <select
                name="jenis_kepegawaian"
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white"
                value={formData.jenis_kepegawaian}
                onChange={handleChange}
              >
                <option value="">-- Pilih Jenis Kepegawaian --</option>
                <option value="PNS">PNS</option>
                <option value="HONORER">HONORER</option>
                <option value="TENDIK">TENDIK</option>
              </select>
            </div>

            {/* FOTO */}
            <div className="flex flex-col">
              <label className="text-gray-200 mb-1">Foto</label>

              <input
                id="fotoInput"
                type="file"
                name="foto"
                onChange={handleChange}
                className="hidden"
              />

              <label
                htmlFor="fotoInput"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer text-center"
              >
                Upload Foto
              </label>

              <span className="text-gray-300 text-sm mt-1">
                {formData.foto ? formData.foto.name : "Belum memilih file"}
              </span>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Simpan
            </button>

            {/* BACK BUTTON */}
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
            >
              Batal
            </button>
          </div>

        </form>

      </main>
    </div>
  );
}
