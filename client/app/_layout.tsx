import { router, Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

import "../global.css";

export default function RootLayout() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/");
      } else {
        router.replace("/splash");
      }
    } else {
      router.replace("/splash");
    }
  }, [user, loading]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
