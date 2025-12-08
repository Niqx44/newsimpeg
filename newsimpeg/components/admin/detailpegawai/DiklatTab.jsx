"use client";
import React from "react";
import GenericTable from "@/components/admin/detailpegawai/DetailPegawaiTable";

export default function DiklatTab({ data, openAdd, openEdit, requestDelete, viewFile, pageSize }) {
  const cols = [
    { label: "No", key: "no" },
    { label: "Jenis Diklat", key: "jenis_diklat" },
    { label: "Diklat", key: "diklat" },
    { label: "Waktu", key: "waktu" },
    { label: "Penyelenggara", key: "penyelenggara" },
    { label: "File", key: "file", align: "center" },
    { label: "Action", key: "action", align: "center" },
  ];
  return <GenericTable columns={cols} data={data} pageSize={pageSize} openAdd={openAdd} onEdit={openEdit} onDelete={requestDelete} onViewFile={viewFile} />;
}
