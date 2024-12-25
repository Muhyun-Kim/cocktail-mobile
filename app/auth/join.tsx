import { registerWithEmail } from "@/controllers/authController";
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

export default function Join() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleJoin = async () => {
    try {
      if (password !== passwordConfirmation) {
        Alert.alert("パスワードが一致しません");
        return;
      }
      await registerWithEmail({ email, password, userName });
      Alert.alert("登録完了", "ログインしてください");
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={userName}
        onChangeText={setUserName}
        placeholder="ユーザー名"
        style={styles.textInput}
        placeholderTextColor="#a6a6a6"
      />
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
      <TextInput
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        placeholder="パスワード確認"
        style={styles.textInput}
        placeholderTextColor="#a6a6a6"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => router.push("/auth/login")}
      >
        <Text style={styles.loginBtnText}>ログインへ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.joinBtn} onPress={handleJoin}>
        <Text style={styles.joinBtnText}>会員登録</Text>
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
  loginBtn: {},
  loginBtnText: {
    color: "#fff",
  },
  joinBtn: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
  },
  joinBtnText: {
    color: "#fff",
  },
});
