import { readUserRecipesList } from "@/controllers/userCocktailController";
import { UserCocktail } from "@/models/userCocktail";
import palette from "@/utils/palette";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

export default function MapScreen() {
  const router = useRouter();
  const [userRecipesList, setUserRecipesList] = useState<UserCocktail[]>([]);

  useEffect(() => {
    const fetchUserRecipesList = async () => {
      const data = await readUserRecipesList();
      setUserRecipesList(data);
      console.log(data);
    };
    fetchUserRecipesList();
  }, []);
  const renderItem = ({ item }: { item: UserCocktail }) => (
    <TouchableOpacity style={styles.cocktailContainer} onPress={() => {}}>
      <Image
        source={{
          uri:
            item.imageUrl ||
            "https://cdn.pixabay.com/photo/2020/11/11/21/13/cocktail-5733675_1280.png",
        }}
        style={styles.image}
      />
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.imageUrl}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={userRecipesList}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReachedThreshold={0.5}
      />
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
  cocktailContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    backgroundColor: palette.background,
    padding: 10,
    borderColor: palette.onBackground,
    borderWidth: 1,
    borderRadius: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "cover",
    backgroundColor: "#ccc",
  },
});
