import { styles } from "@/styles/Style";
import { Slot } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <View style={styles.ColorContainer}>
      <Slot />
    </View>
  );
}
