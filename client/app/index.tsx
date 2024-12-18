import Header from "@/components/Header";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-blue-200/15">
      <Header />
      <View className="text-center flex-1 items-center justify-center">
        <Text className="text-3xl text-red-500">Welcome to Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
