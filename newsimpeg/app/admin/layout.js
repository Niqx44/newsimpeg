import Header from "@/components/admin/HeaderAdmin";
import Sidebar from "@/components/admin/SidebarAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* SIDEBAR ADMIN */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex flex-col flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto w-full">
          <Header />
        </div>

        <main className="flex-1 px-6 py-4">
          {children}
        </main>
      </div>

    </div>
  );
}
