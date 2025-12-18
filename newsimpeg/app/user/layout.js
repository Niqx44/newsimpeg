import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import RouteGuard from "@/components/guards/RouteGuard";

export default function UserLayout({ children }) {
  return (
    <RouteGuard allow={["user"]}>
      <div className="flex h-screen overflow-hidden">

        <Sidebar />

        <div className="flex flex-col flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            <Header avatar="/user.jpg" />
          </div>

          <main className="flex-1 px-6 py-4">
            {children}
          </main>
        </div>

      </div>
    </RouteGuard>
  );
}
