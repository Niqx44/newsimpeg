"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(undefined); // loading

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole || null);
  }, []);

  const loginAsAdmin = () => {
    localStorage.setItem("role", "admin");
    document.cookie = "role=admin; path=/";
    setRole("admin");
  };

  const loginAsUser = () => {
    localStorage.setItem("role", "user");
    document.cookie = "role=user; path=/";
    setRole("user");
  };

  const logout = () => {
    localStorage.removeItem("role");
    document.cookie = "role=; Max-Age=0; path=/";
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, loginAsAdmin, loginAsUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
