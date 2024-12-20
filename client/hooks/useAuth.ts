import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/lib/axios";
import { router } from "expo-router";
import { useState, useEffect } from "react";

type User = {
  token: string;
  id: string;
  name: string;
  email: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user from AsyncStorage on app startup
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, password });
      const loggedInUser = response.data.user;

      // Save user to state and AsyncStorage
      setUser(loggedInUser);
      await AsyncStorage.setItem("user", JSON.stringify(loggedInUser));
      return true;
    } catch (error: any) {
      console.error("Error logging in (useAuth):", error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      const registeredUser = response.data.user;

      // Save user to state and AsyncStorage
      setUser(registeredUser);
      await AsyncStorage.setItem("user", JSON.stringify(registeredUser));
      return true;
    } catch (error: any) {
      console.error("Error registering (useAuth):", error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
      router.replace("/(auth)/login");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  return { user, loading, login, register, logout };
};
