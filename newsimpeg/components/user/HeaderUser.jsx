"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function HeaderUser() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/user/dashboard") return "Dashboard";
    if (pathname.startsWith("/user/profil")) return "Profil Pegawai";
    if (pathname.startsWith("/user/datapegawai")) return "Data Pegawai";
    if (pathname.startsWith("/user/organisasi")) return "Data Organisasi";
    if (pathname.startsWith("/user/peraturan")) return "Peraturan";
    if (pathname.startsWith("/user/password")) return "Ganti Password";
    return "SIMPEG UNM";
  };

  return (
    <header className="bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100">
          {getPageTitle()}
        </h1>

        <div className="flex items-center space-x-4">
          <Bell className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
          <Image
            src="/admin.jpg"
            alt="user"
            width={35}
            height={35}
            className="rounded-full border border-gray-600"
          />
        </div>
      </div>
    </header>
  );
}
