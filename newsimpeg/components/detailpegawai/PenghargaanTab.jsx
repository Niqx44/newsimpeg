"use client";
import React from "react";
import GenericTable from "@/components/detailpegawai/DetailPegawaiTable";

export default function PenghargaanTab({ data, openAdd, openEdit, requestDelete, viewFile, pageSize }) {
  const cols = [
    { label: "No", key: "no" },
    { label: "Penghargaan", key: "penghargaan" },
    { label: "Tingkat", key: "tingkat" },
    { label: "Penyelenggara", key: "penyelenggara" },
    { label: "Tanggal Penghargaan", key: "tanggal_penghargaan" },
    { label: "Keterangan", key: "keterangan" },
    { label: "File", key: "file", align: "center" },
    { label: "Action", key: "action", align: "center" },
  ];
  return <GenericTable columns={cols} data={data} pageSize={pageSize} openAdd={openAdd} onEdit={openEdit} onDelete={requestDelete} onViewFile={viewFile} />;
}
