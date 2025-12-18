"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 rounded bg-[#1e1e1e] shadow-md">
        <p className="text-white">Jumlah : {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function PendidikanChart({ data }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <h2 className="text-[#1e1e1e] text-lg mb-2">
        Statistik Pendidikan Pegawai
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="pendidikan" stroke="#1e1e1e" />
          <YAxis stroke="#1e1e1e" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="jumlah"
            fill="#FF9149"
            activeBar={{ fill: "#FFECDB" }}
          >
            <LabelList dataKey="jumlah" position="top" fill="#1e1e1e" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
