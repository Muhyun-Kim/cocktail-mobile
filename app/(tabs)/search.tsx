import { getExternalCocktailList } from "@/controllers/externalCocktailController";
import { ExternalCocktail } from "@/models/externalCocktail";
import palette from "@/utils/palette";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";

export default function SearchScreen() {
  const [cocktailList, setCocktailList] = useState<ExternalCocktail[]>([]);
  const [alphabetListNum, setAlphabetListNum] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const navigation = useNavigation();
  const router = useRouter();

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {},
      headerLeft: () => {
        if (isSearching) {
          return (
            <GestureHandlerRootView>
              <TouchableWithoutFeedback onPress={() => setIsSearching(false)}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search cocktails..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus={true}
                  onBlur={() => setIsSearching(false)}
                />
              </TouchableWithoutFeedback>
            </GestureHandlerRootView>
          );
        }
        return (
          <TouchableOpacity
            onPress={() => setIsSearching(true)}
            style={{ marginRight: 15 }}
          >
            <FontAwesome name="search" size={20} color={palette.onSurface} />
          </TouchableOpacity>
        );
      },
    });
  }, [isSearching, searchQuery, navigation]);

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
    <TouchableOpacity
      style={styles.cocktailContainer}
      onPress={() =>
        router.push({
          pathname: "/external-cocktail/[id]",
          params: { id: item.idDrink },
        })
      }
    >
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
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: palette.surface,
    color: palette.onSurface,
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
});
