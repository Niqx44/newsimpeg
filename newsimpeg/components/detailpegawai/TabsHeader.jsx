"use client";

import {
  User,
  Layers,
  Briefcase,
  GraduationCap,
  BookOpen,
  BarChart3,
  Medal,
  BadgeCheck,
  FolderArchive,
  TrendingUp,
} from "lucide-react";

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "golongan", label: "Riwayat Golongan", icon: Layers },
  { key: "jabatan", label: "Riwayat Jabatan", icon: Briefcase },
  { key: "pendidikan", label: "Riwayat Pendidikan", icon: GraduationCap },
  { key: "diklat", label: "Riwayat Diklat", icon: BookOpen },
  { key: "riset", label: "Riwayat Riset", icon: BarChart3 },
  { key: "penghargaan", label: "Riwayat Penghargaan", icon: Medal },
  { key: "kgb", label: "Riwayat KGB", icon: BadgeCheck },
  { key: "arsip", label: "Arsip Digital", icon: FolderArchive },
  { key: "karir", label: "Karir", icon: TrendingUp },
];

export default function TabsHeader({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-6 border-b border-gray-700 pb-2 mb-6 overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 flex items-center gap-2 text-sm font-medium transition ${
              isActive
                ? "text-black border-b-2 border-blue-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
