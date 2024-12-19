import Header from "@/components/Header";
import { styles } from "@/styles/Style";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView style={styles.ColorContainer}>
      <Header />
      <View>
        <Text>Profile Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
