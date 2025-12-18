"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { loginAsAdmin, loginAsUser } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow space-y-4 w-80">

        <button
          onClick={() => {
            loginAsAdmin();
            router.push("/admin/dashboard");
          }}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login Admin
        </button>

        <button
          onClick={() => {
            loginAsUser();
            router.push("/user/dashboard");
          }}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Login User
        </button>

      </div>
    </div>
  );
}
