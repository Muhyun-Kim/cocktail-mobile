import { getExternalCocktailById } from "@/controllers/externalCocktailController";
import { ExternalCocktail } from "@/models/externalCocktail";
import palette from "@/utils/palette";
import { useNavigation, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function ExternalCocktailDetail() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [cocktail, setCocktail] = useState<ExternalCocktail | null>(null);

  const strIngredient = Array.from({ length: 15 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchCocktail = async () => {
      const cocktail = await getExternalCocktailById(id as string);
      setCocktail(cocktail);
    };
    fetchCocktail();
  }, [id]);
  useEffect(() => {
    if (cocktail?.strDrink) {
      navigation.setOptions({
        headerTitle: cocktail.strDrink,
      });
    }
    console.log(cocktail);
  }, [cocktail, navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            cocktail?.strDrinkThumb ||
            "https://cdn.pixabay.com/photo/2020/11/11/21/13/cocktail-5733675_1280.png",
        }}
        style={styles.image}
      />
      {strIngredient.map((index) => {
        const ingredientKey = `strIngredient${index}` as keyof ExternalCocktail;
        const strMeasureKey = `strMeasure${index}` as keyof ExternalCocktail;
        if (cocktail?.[ingredientKey]) {
          return (
            <View style={styles.ingredient}>
              <Text style={styles.text} key={index}>
                {`${cocktail[ingredientKey]}: `}
              </Text>
              <Text style={styles.text}>
                {cocktail[strMeasureKey] ? cocktail[strMeasureKey] : "tt"}
              </Text>
            </View>
          );
        }
      })}
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
    fontSize: 18,
  },
  ingredient: {
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: 360,
    height: 360,
  },
});
