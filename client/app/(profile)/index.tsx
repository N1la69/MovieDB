import Header from "@/components/Header";
import { styles } from "@/styles/Style";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "expo-router";

const Profile = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login"); // Navigate to the login page
  };

  return (
    <SafeAreaView style={styles.ColorContainer}>
      <Header />
      <View className="flex-1 justify-center items-center p-4 ">
        <Text className="text-xl font-bold ">Profile Home</Text>
        <Button onPress={handleLogout} title="Logout"></Button>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
