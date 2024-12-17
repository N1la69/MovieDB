import api from "@/lib/axios";
import { router } from "expo-router";
import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, password });
      setUser(response.data.user);
      return true;
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      setUser(response.data.user);
      return true;
    } catch (error: any) {
      console.error("Error registering:", error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    router.replace("/(auth)/login");
  };

  return { user, loading, login, register, logout };
};
