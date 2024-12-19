import AddMovie from "@/components/AddMovie";
import Header from "@/components/Header";
import { styles } from "@/styles/Style";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView style={styles.ColorContainer}>
      <Header />
      <View className="text-center flex-1 items-center justify-center">
        <Text className="text-3xl text-red-500">Welcome to Home Screen</Text>
        <AddMovie />
      </View>
    </SafeAreaView>
  );
};

export default Home;
