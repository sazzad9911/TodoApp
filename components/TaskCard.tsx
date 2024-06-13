import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckBox from "./CheckBox";

export default function TaskCard() {
  const [checked, setCheck] = useState(false);
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        paddingBottom: 5,
        borderBottomColor: "#e6e6e6",
        flex:1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          flex:1
        }}
      >
        <CheckBox checked={checked} onChange={() => setCheck((v) => !v)} />
        <View style={{flex:1}}>
          <Text numberOfLines={2}
            style={{
              fontSize: 16,
              fontWeight: "600",
              flex:1
            }}
          >
            Get HTML color codes, Hex color codes, RGB and HSL values with our color picker, color chart and HTML color names. Let's go!
          </Text>
          <Text>Due </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row",gap:10,marginLeft:10 }}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="file-image-plus-outline"
            size={24}
            color="#0082D6"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="delete-circle" size={26} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
