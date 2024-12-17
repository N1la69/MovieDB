import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="text-center flex items-center justify-center">
      <Text className="text-3xl text-red-500">Home Screen</Text>
    </SafeAreaView>
  );
};

export default Home;
