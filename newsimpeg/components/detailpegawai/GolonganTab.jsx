"use client";
import React from "react";
import GenericTable from "@/components/detailpegawai/DetailPegawaiTable";

export default function GolonganTab({ data, openAdd, openEdit, requestDelete, viewFile, pageSize }) {
  const cols = [
    { label: "No", key: "no" },
    { label: "Jenis KP", key: "jenis_kp" },
    { label: "Golongan", key: "golongan" },
    { label: "TMT", key: "tmt" },
    { label: "Masa Kerja", key: "masa_kerja" },
    { label: "File", key: "file", align: "center" },
    { label: "Action", key: "action", align: "center" },
  ];

  // adapt data: add fields used by GenericTable (file is object or null)
  const adapt = data.map((r) => ({ ...r }));

  return (
    <GenericTable
      columns={cols}
      data={adapt}
      pageSize={pageSize}
      openAdd={openAdd}
      onEdit={openEdit}
      onDelete={(id)=>requestDelete(id)}
      onViewFile={viewFile}
    />
  );
}
