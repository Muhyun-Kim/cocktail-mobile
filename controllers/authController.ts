import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

/**
 * @param {Object} params - 사용자 정보를 포함한 객체
 * @param {string} params.email
 * @param {string} params.password
 * @param {string} params.userName
 * @returns firebase user info
 */
export const registerWithEmail = async ({
  email,
  password,
  userName,
}: {
  email: string;
  password: string;
  userName: string;
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await saveUserToFirestore(user.uid, email, userName);
    return { userId: user.uid, email: user.email, userName };
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const loginWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;
    const user = await getUserFromFirestore(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return { userId, email, userName: user.userName };
  } catch (error) {
    console.log(error);
  }
};

const saveUserToFirestore = async (
  userId: string,
  email: string,
  userName: string
) => {
  const userRef = doc(db, "users", userId);
  try {
    await setDoc(userRef, {
      email,
      userName,
      createdAt: new Date(),
      isDeactivated: false,
      deactivatedAt: null,
    });
  } catch (error) {
    console.error("Failed to save user to Firestore:", error);
    throw error;
  }
};

const getUserFromFirestore = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  try {
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return null;
    }
    return userDoc.data();
  } catch (error) {
    console.error("Failed to get user from Firestore:", error);
    throw error;
  }
};
