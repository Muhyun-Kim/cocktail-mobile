import { loginWithEmail } from "@/controllers/authController";
import { setUserInfo } from "@/state/slices/authSlice";
import { store } from "@/state/store";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const user = await loginWithEmail({ email, password });
      if (user) {
        console.log("로그인 성공", user);
        dispatch(
          setUserInfo({
            userId: user.userId,
            email: user.email,
            userName: user.userName,
            createdAt: user.createdAt,
            isDeactivated: user.isDeactivated,
            deactivatedAt: user.deactivatedAt,
          })
        );
        router.replace("/");
      } else {
        Alert.alert("ログインに失敗しました");
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        style={styles.textInput}
        placeholderTextColor="#a6a6a6"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="パスワード"
        style={styles.textInput}
        placeholderTextColor="#a6a6a6"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.joinBtn}
        onPress={() => router.push("/auth/join")}
      >
        <Text style={styles.joinBtnText}>会員登録へ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>ログイン</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  textInput: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    color: "#fff",
  },
  joinBtn: {},
  joinBtnText: {
    color: "#fff",
  },
  loginBtn: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
  },
  loginBtnText: {
    color: "#fff",
  },
});
