"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 rounded bg-black border border-white shadow-md">
        <p className="text-white">jumlah : {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const GolonganChart = ({ data }) => {
  return (
    <div className="bg-black rounded-xl p-4 shadow-md">
      <h2 className="text-white text-lg mb-2">Statistik Golongan Pegawai</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="golongan" stroke="#ffffff" />
          <YAxis stroke="#fff" />

          {/* Tooltip custom */}
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

          {/* Bar warna putih + hover tetap putih */}
          <Bar
            dataKey="jumlah"
            fill="#ffffff"
            activeBar={{ fill: "#ffffff" }}
          >
            <LabelList dataKey="jumlah" position="top" fill="#000000" />
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GolonganChart;
