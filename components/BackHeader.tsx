import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function BackHeader({ title }: { title: string }) {
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
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text>{title}</Text>
    </View>
  );
}
