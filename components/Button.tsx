import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
}
const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: "#0082D6",
        borderRadius: 5,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "white",
          fontWeight: 500,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
