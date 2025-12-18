"use client";

import { useEffect, useState } from "react";
import OrganisasiTable from "@/components/shared/organisasi/OrganisasiTable";
import OrganisasiFormModal from "@/components/shared/organisasi/OrganisasiFormModal";
import ConfirmDeleteModal from "@/components/shared/organisasi/ConfirmDeleteModal";

export default function AdminOrganisasiPage() {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetch("/data/organisasi.json")
      .then(res => res.json())
      .then(setData);
  }, []);

  function handleSave(form) {
    if (editing) {
      setData(prev =>
        prev.map(i => (i.id === editing.id ? { ...editing, ...form } : i))
      );
    } else {
      setData(prev => [...prev, { id: Date.now(), ...form }]);
    }
    setEditing(null);
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-3">
      <h2 className="text-xl font-semibold text-black mb-4">
        Manajemen Organisasi Unit Kerja
      </h2>

      <div className="bg-[#2b2b2b] p-6 rounded-xl">
        <OrganisasiTable
          data={data}
          isAdmin
          onAdd={() => setEditing({})}
          onEdit={row => setEditing(row)}
          onDelete={row => setDeleting(row)}
        />
      </div>

      <OrganisasiFormModal
        open={!!editing}
        initialData={editing?.id ? editing : null}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />

      <ConfirmDeleteModal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          setData(prev => prev.filter(i => i.id !== deleting.id));
          setDeleting(null);
        }}
      />
    </main>
  );
}
