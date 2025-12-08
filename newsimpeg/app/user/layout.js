import HeaderUser from "@/components/user/HeaderUser";
import SidebarUser from "@/components/user/SidebarUser";

export default function UserLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* SIDEBAR USER */}
      <SidebarUser />

      {/* CONTENT */}
      <div className="flex flex-col flex-1 overflow-auto">
        
        {/* HEADER */}
        <div className="max-w-7xl mx-auto w-full">
          <HeaderUser />
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 px-6 py-4">
          {children}
        </main>
      </div>
    </div>
  );
}
