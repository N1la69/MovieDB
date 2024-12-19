import AddMovie from "@/components/AddMovie";
import Header from "@/components/Header";
import { styles } from "@/styles/Style";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Movie = () => {
  return (
    <SafeAreaView style={styles.ColorContainer}>
      <Header />
      <View>
        <Text>Movie List Screen</Text>
        <AddMovie />
      </View>
    </SafeAreaView>
  );
};

export default Movie;
