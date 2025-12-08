"use client";

import {
  Layers,
  Briefcase,
  GraduationCap,
  BookOpen,
  BarChart3,
  Medal,
  BadgeCheck,
  FolderArchive,
} from "lucide-react";

export default function ApproveTabsHeader({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "golongan", label: "Riwayat Golongan", icon: Layers },
    { key: "jabatan", label: "Riwayat Jabatan", icon: Briefcase },
    { key: "pendidikan", label: "Riwayat Pendidikan", icon: GraduationCap },
    { key: "diklat", label: "Riwayat Diklat", icon: BookOpen },
    { key: "riset", label: "Riwayat Riset", icon: BarChart3 },
    { key: "penghargaan", label: "Riwayat Penghargaan", icon: Medal },
    { key: "kgb", label: "Riwayat KGB", icon: BadgeCheck },
    { key: "arsip", label: "Arsip", icon: FolderArchive },
  ];

  return (
    <div className="flex gap-4 border-b border-gray-700 pb-2 mb-6 overflow-x-auto">
      {tabs.map((t) => {
        const Icon = t.icon;
        const active = activeTab === t.key;

        return (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 pb-2 text-sm font-medium transition ${
              active
                ? "text-black border-b-2 border-blue-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon size={14} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
