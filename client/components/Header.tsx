import { View, Text, StyleSheet } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import SearchBar from "./SearchBar";

export default function Header() {
  const { user } = useAuth();
  const username = user?.name || "Guest";

  return (
    <View className="p-4 bg-blue-500 shadow-xl" style={styles.shadow}>
      <Text className="text-2xl font-bold text-left text-white mb-4">
        Hi {username}, welcome to Movie DB
      </Text>
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
