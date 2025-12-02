"use client";

const CutiTerbaruTable = ({ data }) => {
  return (
    <div className="bg-black rounded-xl p-4 shadow-md mt-6">
      <h2 className="text-white text-lg mb-4">Pengajuan Cuti Terbaru</h2>

      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-2 text-left">Nama</th>
            <th className="py-2 text-left">Jenis Cuti</th>
            <th className="py-2 text-left">Tanggal</th>
            <th className="py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-gray-800">
              <td className="py-2">{row.nama}</td>
              <td className="py-2">{row.jenis}</td>
              <td className="py-2">{row.tanggal}</td>
              <td className="py-2">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CutiTerbaruTable;
