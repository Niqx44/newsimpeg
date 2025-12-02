"use client";

import React from "react";
import { Bell } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/admin/dashboard") return "Dashboard";
    if (pathname.startsWith("/admin/datapegawai")) return "Data Pegawai";
    if (pathname.startsWith("/admin/jabatan")) return "Data Jabatan";
    if (pathname.startsWith("/admin/database")) return "Database";
    if (pathname.startsWith("/admin/laporan")) return "Laporan";
    return "SIMPEG UNM";
  };

  return (
    <header className="bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100">
          {getPageTitle()}
        </h1>

        <div className="flex items-center space-x-3 sm:space-x-6">
          <div className="relative">
            <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 cursor-pointer hover:text-white" />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <Image 
              src="/admin.jpg"
              alt="admin" 
              width={35} 
              height={35} 
              className="rounded-full border border-gray-600"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
