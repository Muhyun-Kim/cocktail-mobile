import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Slot, useRouter, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { RootState, store } from "../state/store";
import { View, StyleSheet } from "react-native";
import { loadUserId } from "@/storage/auth";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/state/slices/authSlice";
import { getUserFromFirestore } from "@/controllers/authController";
import palette from "@/utils/palette";

function AuthGuard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const checkAuth = async () => {
      const userId = await loadUserId();
      if (!userId) {
        router.replace("/auth/login");
        return;
      }
      const userInfo = await getUserFromFirestore(userId);
      if (!userInfo) {
        router.replace("/auth/login");
        return;
      }

      dispatch(
        setUserInfo({
          userId,
          email: userInfo.email,
          userName: userInfo.userName,
          createdAt: userInfo.createdAt,
          isDeactivated: userInfo.isDeactivated,
          deactivatedAt: userInfo.deactivatedAt,
        })
      );
      router.replace("/");
    };
    checkAuth();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: palette.surface,
        },
        headerTintColor: palette.onBackground,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="external-cocktail/[id]"
        options={{ headerBackTitle: "戻る" }}
      />
      <Slot />
    </Stack>
  );
}

export default function Layout() {
  return (
    <Provider store={store}>
      <AuthGuard />
    </Provider>
  );
}
