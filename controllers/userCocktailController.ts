import { db, storage } from "@/firebase";
import { UserCocktail } from "@/models/userCocktail";
import { addDoc, collection, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export interface CreateUserCocktailParams {
  createUserId: string;
  name: string;
  imageFile: string;
  ingredients: string[];
  measures: string[];
  mixingMethod: string;
  instructions: string;
  glass: string | null;
  dateModified: string;
  isPublic: boolean;
  tags?: string[];
}

export const createUserCocktail = async ({
  createUserId,
  name,
  imageFile,
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
