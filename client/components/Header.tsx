import { View, Text } from "react-native";

import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { user } = useAuth();
  const username = user?.name || "Guest";

  return (
    <View className="p-4 bg-blue-500 shadow-xl flex">
      <Text className="text-2xl font-bold text-left text-white">
        Hi {username},
      </Text>
      <Text className="text-xl font-semibold text-right text-white">
        welcome to Movie DB
      </Text>
    </View>
  );
}
