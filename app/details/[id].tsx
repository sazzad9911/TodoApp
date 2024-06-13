import { View, Text, Image, StyleSheet,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { getTask } from "@/utils/storage";
import getTimeFromDate from "@/utils/getTimeFromDate";
import { MaterialIcons } from "@expo/vector-icons";
interface TasksTypes {
  title: string;
  image: string;
  id: string;
  dueDate: Date;
  date: Date;
  user: string;
  check: boolean;
}
export default function Id() {
  const [data, setData] = useState<TasksTypes>();
  const { id } = useLocalSearchParams();
  useEffect(() => {
    const getData = async () => {
      try {
        const localData = await getTask(id as string);
        setData(localData);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [id]);
  if(!data){
    return null
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          {data?.image ? (
            <Image source={{ uri: data.image }} style={styles.reactLogo} />
          ) : (
            <Text>No image Uploaded</Text>
          )}
          <TouchableOpacity  style={styles.cameraIcon}>
            <MaterialIcons name="photo-camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
      }>
      <Text>{data.title}</Text>
      <View style={styles.dateBox}>
        <View
          style={styles.dateButtons}>
          <Text style={{ color: "white" }}>{new Date(data.dueDate).toDateString()}</Text>
        </View>
        <View style={styles.dateButtons}>
          <Text style={{ color: "white" }}>{getTimeFromDate(new Date(data.dueDate))}</Text>
        </View>
      </View>
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  dateBox: {
    flexDirection: "row",
    gap: 10,
  },
  dateButtons: {
    flex: 1,
    backgroundColor: "#0082D6",
    height: 40,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  cameraIcon: {
    position: "absolute",
    right: 20,
    top: 10,
    backgroundColor: "#0082D6",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
