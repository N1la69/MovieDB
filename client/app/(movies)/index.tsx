import Header from "@/components/Header";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Movie = () => {
  return (
    <SafeAreaView>
      <Header />
      <View>
        <Text>Movie List Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default Movie;
