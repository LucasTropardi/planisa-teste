/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { getToken, logout } from "./authService";
import { api } from "../api/api";
import type { User } from "../types/User";
import type { AuthContextType } from "../types/AuthContextType";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(getToken());
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const userData = await api<User>("/me");
      setUser(userData);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      logout();
      setToken(null);
      setUser(null);
    }
  };

  const handleLogin = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    fetchUser();
  };

  const handleLogout = () => {
    logout();
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token]);

  const value = {
    isAuthenticated: !!token,
    token,
    user,
    login: handleLogin,
    logout: handleLogout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
