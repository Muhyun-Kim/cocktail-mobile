import palette from "@/utils/palette";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  console.log("HomeScreen");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.background,
  },
  text: {
    color: palette.onBackground,
    fontSize: 18,
  },
});
