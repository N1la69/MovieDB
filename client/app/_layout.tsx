import { router, Tabs, Slot } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Feather } from "@expo/vector-icons";

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
    }
  }, [user, loading]);

  if (loading) {
    return null;
  }

  return user ? (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(movies)/index"
        options={{
          title: "Movies",
          tabBarIcon: ({ color, size }) => (
            <Feather name="film" size={size} color={color} />
          ),
        }}
      />

      {/* Hide other routes like splash and (auth) */}
      <Tabs.Screen
        name="splash"
        options={{ href: null }} // Hide splash screen
      />
      <Tabs.Screen
        name="(auth)"
        options={{ href: null }} // Hide auth login
      />
      <Tabs.Screen
        name="(movies)/[id]"
        options={{ href: null }} // Hide dynamic movie details
      />
    </Tabs>
  ) : (
    <Slot />
  );
}
