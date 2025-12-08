"use client";
import React from "react";
import GenericTable from "@/components/admin/detailpegawai/DetailPegawaiTable";

export default function KgbTab({ data, openAdd, openEdit, requestDelete, viewFile, pageSize }) {
  const cols = [
    { label: "No", key: "no" },
    { label: "Tanggal KGB", key: "tanggal_kgb" },
    { label: "Masa Kerja", key: "masa_kerja" },
    { label: "File", key: "file", align: "center" },
    { label: "Action", key: "action", align: "center" },
  ];
  return <GenericTable columns={cols} data={data} pageSize={pageSize} openAdd={openAdd} onEdit={openEdit} onDelete={requestDelete} onViewFile={viewFile} />;
}
