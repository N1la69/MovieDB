import { router } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Splash = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView>
      <Text className="text-3xl text-red-400 text-center">
        Welcome to Movie DB
      </Text>
    </SafeAreaView>
  );
};

export default Splash;
