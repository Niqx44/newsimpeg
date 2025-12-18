"use client";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { loginAsAdmin, loginAsUser, role } = useAuth();

  return (
    <div className="p-10 text-black">
      <button onClick={loginAsAdmin}>Login Admin</button>
      <button onClick={loginAsUser} className="ml-4">
        Login User
      </button>
      <p className="mt-4">Current role: {role}</p>
    </div>
  );
}
