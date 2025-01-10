import palette from "@/utils/palette";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Checkbox } from "react-native-paper";
import { createUserCocktail } from "@/controllers/userCocktailController";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import * as ImageManipulator from "expo-image-manipulator";

export default function UserCocktailDetail() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [imageFile, setImageFile] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [measures, setMeasures] = useState<string[]>([]);
  const [mixingMethod, setMixingMethod] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [glass, setGlass] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [tags, setTags] = useState<string[]>([]);

  const onClickSaveBtn = async () => {
    if (
      !name ||
      !ingredients ||
      !measures ||
      !mixingMethod ||
      !instructions ||
      !glass
    ) {
      console.log("必須項目が入力されていません");
    } else {
      console.log("保存");
      await createUserCocktail({
        createUserId: userId!,
        imageFile,
        name,
        ingredients,
        measures,
        mixingMethod,
        instructions,
        glass,
        dateModified: new Date().toISOString(),
        isPublic,
        tags,
      });
    }
  };

  useEffect(() => {
    if (id === "0") {
      navigation.setOptions({
        headerTitle: "レシピを追加",
        headerRight: () => {
          return (
            <TouchableOpacity onPress={onClickSaveBtn}>
              <Text style={styles.text}>保存</Text>
            </TouchableOpacity>
          );
        },
      });
    }
  }, [navigation]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("画像ライブラリーへのアクセス権限が必要です。");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 800 } }],
          {
            compress: 0.6,
            format: ImageManipulator.SaveFormat.JPEG,
          }
        );
        setImageFile(manipulatedImage.uri);
      } catch (e) {
        console.log(e);
        alert("容量が小さい画像を使用してください。");
      }
    }
  };

  return (
    <View style={styles.container}>
      {!imageFile && (
        <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
          <Text style={styles.text}>ファイルアップロード</Text>
        </TouchableOpacity>
      )}
      {imageFile && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageFile }} style={styles.imagePreview} />
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.text}>ファイル変更</Text>
          </TouchableOpacity>
        </View>
      )}
      <TextInput
        style={styles.textInput}
        placeholder="cocktail name"
        placeholderTextColor="#a6a6a6"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.textInput}
        placeholder="ingredients"
        placeholderTextColor="#a6a6a6"
        value={ingredients.join(",")}
        onChangeText={(text) =>
          setIngredients(text.split(",").map((item) => item.trim()))
        }
      />
      <TextInput
        style={styles.textInput}
        placeholder="measures"
        placeholderTextColor="#a6a6a6"
        value={measures.join(",")}
        onChangeText={(text) =>
          setMeasures(text.split(",").map((item) => item.trim()))
        }
      />
      <TextInput
        style={styles.textInput}
        placeholder="mixing method"
        placeholderTextColor="#a6a6a6"
        value={mixingMethod}
        onChangeText={setMixingMethod}
      />
      <TextInput
        style={styles.textInput}
        placeholder="instructions"
        placeholderTextColor="#a6a6a6"
        value={instructions}
        onChangeText={setInstructions}
      />
      <TextInput
        style={styles.textInput}
        placeholder="glass"
        placeholderTextColor="#a6a6a6"
        value={glass}
        onChangeText={setGlass}
      />
      <TextInput
        style={styles.textInput}
        placeholder="tags"
        placeholderTextColor="#a6a6a6"
        value={tags.join(",")}
        onChangeText={(text) => setTags(text.split(","))}
      />
      <View style={styles.checkBoxContainer}>
        <View style={styles.checkBox}>
          <Checkbox
            status={isPublic ? "checked" : "unchecked"}
            onPress={() => setIsPublic(!isPublic)}
            color={palette.primary}
          />
        </View>
        <Text style={styles.text}>非公開時にチェック</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    alignItems: "center",
    gap: 20,
  },
  text: {
    color: palette.onBackground,
  },
  textInput: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    color: palette.onBackground,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  imageBtn: {
    width: "80%",
    height: 200,
    resizeMode: "cover",
    marginTop: 16,
    borderColor: palette.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "80%",
    height: 200,
    resizeMode: "cover",
    marginTop: 16,
  },
  checkBoxContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderColor: palette.onBackground,
    borderWidth: 1,
    marginRight: 8,
  },
});
