"use client";
import React from "react";
import GenericTable from "@/components/detailpegawai/DetailPegawaiTable";

export default function ArsipTab({ data, openAdd, openEdit, requestDelete, viewFile, pageSize }) {
  const cols = [
    { label: "No", key: "no" },
    { label: "Jenis Arsip", key: "jenis_arsip" },
    { label: "File", key: "file", align: "center" },
    { label: "Action", key: "action", align: "center" },
  ];
  return <GenericTable columns={cols} data={data} pageSize={pageSize} openAdd={openAdd} onEdit={openEdit} onDelete={requestDelete} onViewFile={viewFile} />;
}
