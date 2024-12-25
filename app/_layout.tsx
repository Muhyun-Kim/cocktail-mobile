import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Slot, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState, store } from "../state/store";
import { View, StyleSheet } from "react-native";

function AuthGuard() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

export default function Layout() {
  return (
    <Provider store={store}>
      <AuthGuard />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
