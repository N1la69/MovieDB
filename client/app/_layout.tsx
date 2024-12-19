import { router, Tabs, Slot } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

import "../global.css";

const allowedIcons = ["home", "user", "search", "settings", "film"];

const TabIcon = ({
  focused,
  source,
}: {
  source: keyof typeof Feather.glyphMap;
  focused: boolean;
}) => {
  const isValidIcon = allowedIcons.includes(source);

  if (!isValidIcon) {
    console.error(`Invalid icon name: ${source}`);
    return null;
  }
  return (
    <View
      className={`flex flex-row justify-center items-center rounded-full ${
        focused ? "bg-blue-950" : ""
      }`}
    >
      <View
        className={`rounded-full w-12 h-12 items-center justify-center ${
          focused ? "bg-blue-950" : ""
        }`}
      >
        <Feather name={source} size={24} color="white" className="w-7 h-7" />
      </View>
    </View>
  );
};

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
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#3b82f6",
          borderRadius: 50,
          paddingTop: 0,
          paddingBottom: 25,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 15,
          height: 70,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source="home" />
          ),
        }}
      />

      <Tabs.Screen
        name="(movies)/index"
        options={{
          title: "Movies",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source="film" />
          ),
        }}
      />

      <Tabs.Screen
        name="(profile)/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source="user" />
          ),
        }}
      />

      {/* Hide other routes like splash and (auth) */}
      <Tabs.Screen name="splash" options={{ href: null }} />
      <Tabs.Screen name="(auth)" options={{ href: null }} />
      <Tabs.Screen name="(movies)/[id]" options={{ href: null }} />
    </Tabs>
  ) : (
    <Slot />
  );
}
