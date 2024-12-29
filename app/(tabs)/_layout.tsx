import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import palette from "@/utils/palette";
import { TouchableOpacity } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: palette.surface,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: palette.onBackground,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof FontAwesome>["name"];

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "search") {
            iconName = "search";
          } else if (route.name === "map") {
            iconName = "map";
          } else if (route.name === "profile") {
            iconName = "user";
          } else {
            iconName = "home";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: palette.iconActive,
        tabBarInactiveTintColor: palette.iconInactive,
        tabBarStyle: {
          backgroundColor: palette.surface,
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen
        name="search"
        options={{
          title: "検索",
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => {}} style={{ marginRight: 15 }}>
                <FontAwesome
                  name="search"
                  size={20}
                  color={palette.onSurface}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen name="map" options={{ title: "Map" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
