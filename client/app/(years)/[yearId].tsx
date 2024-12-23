import Header from "@/components/Header";
import { styles } from "@/styles/Style";
import { useSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const YearPage = () => {
  const searchParams = useSearchParams();
  const yearId = searchParams.get("yearId");

  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.ColorContainer}>
      <Header />
      <Text>Year Page: {yearId}</Text>
    </SafeAreaView>
  );
};

export default YearPage;
