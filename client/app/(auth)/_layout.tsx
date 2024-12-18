import { Slot } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <View className="flex-1 bg-blue-200/10">
      <Slot />
    </View>
  );
}
