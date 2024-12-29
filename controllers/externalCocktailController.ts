import { ExternalCocktail } from "@/models/externalCocktail";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

export const getExternalCocktailList = async (alphabet: string) => {
  try {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${alphabet}`
    );
    const data = await res.json();
    const drinks: ExternalCocktail[] = data.drinks;
    return drinks;
  } catch (error) {
    console.error("Error fetching cocktail data:", error);
  }
};
