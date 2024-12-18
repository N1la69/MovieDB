import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <View className="text-center flex-1 items-center justify-center">
      <Text className="text-3xl text-red-500">Welcome to Home Screen</Text>
    </View>
  );
};

export default Home;
