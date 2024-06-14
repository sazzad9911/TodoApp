import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

export default function BackHeader({ title,lightColor,darkColor }: { title: string, lightColor?: string, darkColor?: string}) {
  const bg = useThemeColor({ light: lightColor, dark: darkColor }, "background");
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: .6,
        elevation: 4,
        backgroundColor:bg
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={24} color={color} />
      </TouchableOpacity>
      <ThemedText>{title}</ThemedText>
    </View>
  );
}
