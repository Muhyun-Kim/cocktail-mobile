import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserId = async (userId: string) => {
  try {
    await AsyncStorage.setItem("userId", userId);
    console.log("유저 저장 성공", userId);
  } catch (error) {
    console.log("유저 저장 실패");
    console.error("Failed to save auth state:", error);
  }
};

export const loadUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    console.log("유저 불러오기 성공", userId);
    return userId ? userId : null;
  } catch (error) {
    console.log("유저 저장 실패");
    console.error("Failed to load auth state:", error);
    return null;
  }
};
