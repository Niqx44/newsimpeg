"use client";

import { useState } from "react";
import {
  Folder,
  Database,
  LayoutDashboard,
  Monitor,
  Book,
  Users,
  Menu,
  ClipboardCheck,
  ClipboardList,
  FileUser,
  NotebookText,
  Scale,
  Megaphone,
  HardDrive,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { SIDEBAR_BY_ROLE } from "@/lib/sidebarConfig";

const ICONS = {
  Folder,
  Database,
  LayoutDashboard,
  Monitor,
  Book,
  Users,
  ClipboardCheck,
  ClipboardList,
  FileUser,
  NotebookText,
  Scale,
  Megaphone,
  HardDrive,
};

export default function Sidebar() {
  const { role } = useAuth();              // 🔑 ambil role
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // ⛔ role belum siap
  if (!role) return null;

  const sidebarItems = SIDEBAR_BY_ROLE[role] || [];

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f] overflow-hidden">
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-[#2f2f2f] transition-colors cursor-pointer"
          >
            <Menu size={24} />
          </button>

          {isSidebarOpen && (
            <div className="flex items-center space-x-3 ml-3 transition-opacity duration-300">
              <Image
                src="/UNM.jpg"
                alt="logo-unm"
                width={35}
                height={35}
                className="rounded-full border border-gray-600"
              />
              <span className="text-gray-100 font-bold whitespace-nowrap">
                SIMPEG UNM
              </span>
            </div>
          )}
        </div>

        <nav className="mt-8 grow overflow-y-auto pr-1 sidebar-scroll">
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon];
            const isActive = pathname === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${
                    isActive ? "bg-[#2f2f2f]" : ""
                  }`}
                >
                  <IconComponent size={20} style={{ minWidth: "20px" }} />
                  {isSidebarOpen && (
                    <span className="ml-4 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
