import { styles } from "@/styles/Style";
import { View, TextInput } from "react-native";

const SearchBar = () => {
  return (
    <View>
      <TextInput
        placeholder="Search movie or genre..."
        clearButtonMode="always"
        className=""
        style={styles.SearchBarStyle}
      />
    </View>
  );
};

export default SearchBar;

//https://youtu.be/Q4S9M9rJAxk?si=mS6f19zwPNjovXAy
