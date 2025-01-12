import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "@/firebase";
import { UserCocktail } from "@/models/userCocktail";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export interface CreateUserCocktailParams {
  createUserId: string;
  imageFile: string | null;
  name: string;
  ingredients: string[];
  measures: string[];
  mixingMethod: string;
  instructions: string;
  glass: string | null;
  dateModified: string;
  isPublic: boolean;
  tags?: string[];
}

export const readUserRecipesList = async () => {
  var userCocktailList: UserCocktail[] = [];
  const userCocktailRef = collection(db, "userCocktails");
  try {
    const snapshot = await getDocs(userCocktailRef);
    snapshot.forEach((doc) => {
      userCocktailList.push({ id: doc.id, ...doc.data() } as UserCocktail);
    });
  } catch (e) {
    console.log(e);
  }
  return userCocktailList;
};

export const createUserCocktail = async ({
  createUserId,
  imageFile,
  name,
  ingredients,
  measures,
  mixingMethod,
  instructions,
  glass,
  dateModified,
  isPublic,
  tags,
}: CreateUserCocktailParams) => {
  let imageUrl = null;
  try {
    if (imageFile) {
      const response = await fetch(imageFile);
      const blob = await response.blob();
      const imageRef = ref(storage, `userCocktails/${uuidv4()}-image.jpg`);
      await uploadBytes(imageRef, blob);
      imageUrl = await getDownloadURL(imageRef);
    }
  } catch (e) {
    console.log(e);
    return 0;
  }
  const userCocktailRef = collection(db, "userCocktails");
  const newData: UserCocktail = {
    createUserId,
    name,
    imageUrl,
    ingredients,
    measures,
    mixingMethod,
    instructions,
    glass,
    dateModified,
    isPublic,
    tags: tags || [],
    commentsCount: 0,
    likesCount: 0,
  };
  try {
    const docRef = await addDoc(userCocktailRef, newData);
    return docRef.id;
  } catch (e) {
    console.log(e);
    return 0;
  }
};
