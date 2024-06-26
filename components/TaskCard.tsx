import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckBox from "./CheckBox";
import getTimeFromDate from "@/utils/getTimeFromDate";
import { router } from "expo-router";
import { checkTask } from "@/utils/storage";
import { ThemedText } from "./ThemedText";

export default function TaskCard({
  title,
  dueDate,
  onDelete,
  id,
  check,
}: {
  title: string;
  dueDate: Date;
  onDelete: () => void;
  id: string;
  check: boolean;
}) {
  const [checked, setCheck] = useState(check);
  //console.log(check);
  useEffect(()=>{
    setCheck(check)
  },[check,id])
  return (
    <TouchableOpacity
      onPress={() => router.push(`/details/${id}`)}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        paddingBottom: 5,
        borderBottomColor: "#e6e6e6",
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          flex: 1,
        }}
      >
        <CheckBox
          checked={checked}
          onChange={async () => {
            await checkTask(id, !checked);
            setCheck((v) => !v);
          }}
        />
        <View style={{ flex: 1 }}>
          <ThemedText
            numberOfLines={2}
            style={{
              fontSize: 16,
              fontWeight: "600",
              flex: 1,
            }}
          >
            {title}
          </ThemedText>
          <ThemedText style={{ flex: 1 }}>
            Due- {new Date(dueDate).toLocaleString()}
          </ThemedText>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginLeft: 10 }}>
        <TouchableOpacity onPress={() => router.push(`/images/${id}`)}>
          <MaterialCommunityIcons
            name="file-image-plus-outline"
            size={24}
            color="#0082D6"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <MaterialCommunityIcons name="delete-circle" size={26} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
