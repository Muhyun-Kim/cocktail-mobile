import palette from "@/utils/palette";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MapScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is your Map!</Text>
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          router.push({ pathname: "/user-cocktail/[id]", params: { id: "0" } })
        }
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
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
    color: "#FFFFFF",
    fontSize: 18,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
