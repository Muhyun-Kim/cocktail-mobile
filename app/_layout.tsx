import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Slot, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState, store } from "../state/store";

function AuthGuard() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login"); // 비로그인 상태면 로그인 페이지로 리다이렉트
    }
  }, [isAuthenticated]);

  return <Slot />;
}

export default function Layout() {
  return (
    <Provider store={store}>
      <AuthGuard />
    </Provider>
  );
}
