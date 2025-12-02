"use client";
import React from "react";
import GenericTable from "@/components/detailpegawai/GenericTable";

export default function JabatanTab({ data, openAdd, openEdit, requestDelete, viewFile, pageSize }) {
  const cols = [
    { label: "No", key: "no" },
    { label: "Jenis Jabatan", key: "jenis_jabatan" },
    { label: "Jabatan", key: "jabatan" },
    { label: "KUM", key: "kum" },
    { label: "TMT", key: "tmt" },
    { label: "File", key: "file", align: "center" },
    { label: "Action", key: "action", align: "center" },
  ];
  return <GenericTable columns={cols} data={data} pageSize={pageSize} openAdd={openAdd} onEdit={openEdit} onDelete={requestDelete} onViewFile={viewFile} />;
}
