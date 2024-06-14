import { View, Text, TextInputProps,TextInput } from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
export type InputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};
export default function ThemeTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: InputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
 
 
  return <TextInput placeholderTextColor={color} style={[{ color,borderColor:"#e5e5e5" }, style]} {...rest} />;
}
