import { getExternalCocktailList } from "@/controllers/externalCocktailController";
import palette from "@/utils/palette";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SearchScreen() {
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search for cocktails here!</Text>
      <TouchableOpacity
        onPress={async () => {
          const cocktail = await getExternalCocktailList("k");
          console.log("drinks", cocktail);
        }}
        style={{ marginRight: 15 }}
      >
        <FontAwesome name="search" size={20} color={palette.onSurface} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  text: {
    color: palette.onBackground,
    fontSize: 18,
  },
});
