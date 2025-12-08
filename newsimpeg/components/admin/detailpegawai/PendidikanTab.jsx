"use client";
import React from "react";
import GenericTable from "@/components/admin/detailpegawai/DetailPegawaiTable";

export default function PendidikanTab({ data, openAdd, openEdit, requestDelete, viewFile, pageSize }) {
  const cols = [
    { label: "No", key: "no" },
    { label: "Jenjang", key: "jenjang" },
    { label: "Lembaga", key: "lembaga" },
    { label: "Prodi/Jurusan", key: "prodi" },
    { label: "Tanggal Lulus", key: "tanggal_lulus" },
    { label: "No Ijazah", key: "no_ijazah" },
    { label: "Ijazah CPNS", key: "ijazah_cpns" },
    { label: "Ijazah Terakhir", key: "ijazah_terakhir" },
    { label: "File", key: "file", align: "center" },
    { label: "Action", key: "action", align: "center" },
  ];
  return <GenericTable columns={cols} data={data} pageSize={pageSize} openAdd={openAdd} onEdit={openEdit} onDelete={requestDelete} onViewFile={viewFile} />;
}
