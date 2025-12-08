"use client";
import React from "react";
import GenericTable from "@/components/detailpegawai/DetailPegawaiTable";

export default function RisetTab({ data, openAdd, openEdit, requestDelete, viewFile, pageSize }) {
  const cols = [
    { label: "No", key: "no" },
    { label: "Publikasi", key: "publikasi" },
    { label: "Tingkat", key: "tingkat" },
    { label: "Jenis", key: "jenis" },
    { label: "Instansi", key: "instansi" },
    { label: "Sumber Dana", key: "sumber_dana" },
    { label: "Keterangan", key: "keterangan" },
    { label: "Waktu", key: "waktu" },
    { label: "File", key: "file", align: "center" },
    { label: "Action", key: "action", align: "center" },
  ];
  return <GenericTable columns={cols} data={data} pageSize={pageSize} openAdd={openAdd} onEdit={openEdit} onDelete={requestDelete} onViewFile={viewFile} />;
}
