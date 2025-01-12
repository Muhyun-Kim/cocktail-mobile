declare module "expo-fast-image" {
  import { ImageProps } from "react-native";

  export interface FastImageProps extends ImageProps {
    source: {
      uri: string;
      headers?: { [key: string]: string };
      priority?: "low" | "normal" | "high";
    };
  }

  const FastImage: React.ComponentType<FastImageProps>;
  export default FastImage;
}
