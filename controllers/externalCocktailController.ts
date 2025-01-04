import { ExternalCocktail } from "@/models/externalCocktail";

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
export const getExternalCocktailById = async (id: string) => {
  try {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    const drink: ExternalCocktail = data.drinks[0];
    return drink;
  } catch (e) {
    console.log(e);
    return null;
  }
};
