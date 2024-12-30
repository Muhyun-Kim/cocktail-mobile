import { getExternalCocktailList } from "@/controllers/externalCocktailController";
import { ExternalCocktail } from "@/models/externalCocktail";
import palette from "@/utils/palette";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";

export default function SearchScreen() {
  const [cocktailList, setCocktailList] = useState<ExternalCocktail[]>([]);
  const [alphabetListNum, setAlphabetListNum] = useState<number>(0); // 'a'부터 시작
  const [loading, setLoading] = useState<boolean>(false);
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  useEffect(() => {
    const fetchInitialCocktails = async () => {
      setLoading(true);
      const cocktails = await getExternalCocktailList(
        alphabet[alphabetListNum]
      );
      setCocktailList(cocktails || []);
      setLoading(false);
    };
    fetchInitialCocktails();
  }, []);

  const loadMoreCocktails = async () => {
    if (loading || alphabetListNum >= alphabet.length - 1) return; // 더 이상 로드할 알파벳이 없을 때 종료
    setLoading(true);

    const additionalCocktails = await getExternalCocktailList(
      alphabet[alphabetListNum + 1]
    );
    setCocktailList((prevCocktails) => [
      ...prevCocktails,
      ...(additionalCocktails || []),
    ]);
    setAlphabetListNum((prev) => prev + 1);
    setLoading(false);
  };

  const renderItem = ({ item }: { item: ExternalCocktail }) => (
    <TouchableOpacity style={styles.cocktailContainer}>
      <Image
        source={{
          uri:
            item.strDrinkThumb ||
            "https://cdn.pixabay.com/photo/2020/11/11/21/13/cocktail-5733675_1280.png",
        }}
        style={styles.image}
      />
      <Text style={styles.text}>{item.strDrink}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cocktailList}
        keyExtractor={(item) => item.idDrink}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={renderItem}
        onEndReached={loadMoreCocktails}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color={palette.onBackground} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  row: {
    justifyContent: "space-between",
  },
  text: {
    color: palette.onBackground,
    fontSize: 18,
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
  image: {
    width: 120,
    height: 120,
  },
});
