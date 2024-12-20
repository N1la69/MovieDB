import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  ColorContainer: {
    flex: 1,
    backgroundColor: "#D5E4F1",
  },
  SearchBarStyle: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },

  // BUTTONS
  NormalButtonStyle: {
    backgroundColor: "#3b82f6",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  CancelButtonStyle: {
    backgroundColor: "red",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  NeutralButtonStyle: {
    backgroundColor: "gray",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
});
