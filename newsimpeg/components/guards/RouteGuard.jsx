"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RouteGuard({ children, allow }) {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ⏳ auth masih loading
    if (role === undefined) return;

    // ❌ belum login
    if (!role) {
      router.replace("/login");
      return;
    }

    // ❌ role tidak sesuai
    if (allow && !allow.includes(role)) {
      router.replace(
        role === "admin" ? "/admin/dashboard" : "/user/dashboard"
      );
    }
  }, [role, allow, router]);

  // 🚫 cegah flicker
  if (role === undefined) return null;
  if (!role) return null;
  if (allow && !allow.includes(role)) return null;

  return children;
}
