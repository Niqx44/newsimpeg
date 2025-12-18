"use client";

import { useEffect, useState } from "react";
import PeraturanTable from "@/components/shared/peraturan/PeraturanTable";
import PeraturanFormModal from "@/components/shared/peraturan/PeraturanModal";
import ConfirmDeleteModal from "@/components/shared/modal/ConfirmDeleteModal";

export default function AdminPeraturanPage() {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetch("/data/peraturan.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

    function handleSave(form) {
    if (editing?.id) {
        setData((prev) =>
        prev.map((i) =>
            i.id === editing.id ? { ...i, ...form } : i
        )
        );
    } else {
        setData((prev) => [
        ...prev,
        {
            id: Date.now(),
            ...form,
        },
        ]);
    }

    setEditing(null);
    }

  return (
    <main className="max-w-7xl mx-auto px-6 py-3">
      <h2 className="text-xl font-semibold text-black mb-4">
        Manajemen Peraturan
      </h2>

      <div className="bg-[#2b2b2b] p-6 rounded-xl">
        <PeraturanTable
          data={data}
          isAdmin
          onAdd={() => setEditing({ _mode: "add" })} 
          onEdit={(row) => setEditing(row)}
          onDelete={(row) => setDeleting(row)}
          onDownload={(row) =>
            console.log("Download:", row.file)
          }
        />
      </div>

      {/* MODAL TAMBAH / EDIT */}
      <PeraturanFormModal
        open={!!editing}
        initialData={editing?.id ? editing : null}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />

      {/* MODAL HAPUS */}
      <ConfirmDeleteModal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          setData((prev) =>
            prev.filter((i) => i.id !== deleting.id)
          );
          setDeleting(null);
        }}
      />
    </main>
  );
}
