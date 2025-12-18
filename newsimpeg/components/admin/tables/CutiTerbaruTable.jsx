"use client";

const CutiTerbaruTable = ({ data }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md mt-6">
      <h2 className="text-gray-700 text-xl font-bold mb-4">Pengajuan Cuti Terbaru</h2>

      <table className="w-full text-gray-800 ">
        <thead>
          <tr className="bg-[#FF9149]">
            <th className="py-2 px-3 text-left">Nama</th>
            <th className="py-2 text-left">Jenis Cuti</th>
            <th className="py-2 text-left">Tanggal</th>
            <th className="py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="bg-[#FFECDB]">
              <td className="py-2 px-3">{row.nama}</td>
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
