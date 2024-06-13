import { View, Text } from "react-native";
import React from "react";
import { usePathname } from "expo-router";

export default function Id() {
  const params = usePathname();
  return (
    <View>
      <Text>Id</Text>
    </View>
  );
}
