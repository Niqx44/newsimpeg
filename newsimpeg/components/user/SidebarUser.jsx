"use client";

import { useState, useEffect } from "react";
import {
  Folder,
  Database,
  LayoutDashboard,
  Monitor,
  Book,
  Users,
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const ICONS = {
  Folder,
  Database,
  LayoutDashboard,
  Monitor,
  Book,
  Users,
};

export default function UserSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarItems, setSidebarItems] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/data/user-sidebar.json")
      .then((res) => res.json())
      .then((data) => setSidebarItems(data.sidebarItems));
  }, []);

  return (
    <div
      className={`relative z-10 transition-all duration-300 shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-[#1e1e1e] p-4 flex flex-col border-r border-[#2f2f2f]">
        {/* HEADER */}
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-[#2f2f2f]"
          >
            <Menu size={22} />
          </button>

          {isSidebarOpen && (
            <div className="flex items-center space-x-3 ml-3">
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

        {/* MENU */}
        <nav className="mt-8 grow">
          {sidebarItems.map((item) => {
            const Icon = ICONS[item.icon];
            const isActive = pathname === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg mb-2
                  hover:bg-[#2f2f2f] transition-colors
                  ${isActive ? "bg-[#2f2f2f]" : ""}`}
                >
                  <Icon size={20} style={{ minWidth: 20 }} />
                  {isSidebarOpen && (
                    <span className="ml-4 whitespace-nowrap">{item.name}</span>
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
