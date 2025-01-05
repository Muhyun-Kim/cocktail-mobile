import palette from "@/utils/palette";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function UserCocktailDetail() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    if (id === "0") {
      navigation.setOptions({
        headerTitle: "レシピを追加",
      });
    }
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>User Cocktail Detail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    alignItems: "center",
  },
  text: {
    color: palette.onBackground,
  },
});
