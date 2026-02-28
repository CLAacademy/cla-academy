"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/types/mock";
import { mockStore } from "@/lib/mock-store";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, fullName: string, role: User["role"]) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(mockStore.getUser());
    setLoading(false);
  }, []);

  const login = (email: string, fullName: string, role: User["role"]) => {
    const u: User = {
      id: "u" + Date.now(),
      email,
      fullName,
      role,
    };
    mockStore.setUser(u);
    setUser(u);
  };

  const signOut = () => {
    mockStore.setUser(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within Providers");
  return ctx;
}
