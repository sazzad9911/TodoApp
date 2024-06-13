import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";

export default function CheckBox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <TouchableOpacity onPress={onChange} style={{
        width:25,
        height:25,
        borderWidth:1,
        borderColor:"gray"
    }}>
      {checked&&(<FontAwesome5 name="check" size={20} color="black" />)}
    </TouchableOpacity>
  );
}
