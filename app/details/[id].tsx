import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { allImages, getTask } from "@/utils/storage";
import getTimeFromDate from "@/utils/getTimeFromDate";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { useIsFocused } from "@react-navigation/native";
interface TasksTypes {
  title: string;
  image: string;
  id: string;
  dueDate: Date;
  date: Date;
  user: string;
  check: boolean;
}
interface ImagesTypes {
  uri: string;
  id: string;
  taskId: string;
}
const { width, height } = Dimensions.get("window");
export default function Id() {
  const [data, setData] = useState<TasksTypes>();
  const { id } = useLocalSearchParams();
  const [imageData, setImageData] = useState<ImagesTypes[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getData = async () => {
      try {
        const localData = await getTask(id as string);
        setData(localData);
        const images = await allImages(id as string);
        setImageData(images);
        //console.log(images.length)
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [id, isFocused]);
  if (!data) {
    return null;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {data?.image ? (
            <Image source={{ uri: data.image }} style={styles.reactLogo} />
          ) : (
            <ThemedText>No image Uploaded</ThemedText>
          )}
          <TouchableOpacity
            onPress={() => {
              router.push(`/edit/${id}`);
            }}
            style={styles.cameraIcon}
          >
            <Feather name="edit" size={20} color="white" />
          </TouchableOpacity>
        </View>
      }
    >
      <ThemedText type="subtitle">{data.title}</ThemedText>
      <View style={styles.dateBox}>
        <View style={styles.dateButtons}>
          <Text style={{ color: "white" }}>
            {new Date(data.dueDate).toDateString()}
          </Text>
        </View>
        <View style={styles.dateButtons}>
          <Text style={{ color: "white" }}>
            {getTimeFromDate(new Date(data.dueDate))}
          </Text>
        </View>
      </View>

      <ThemedText type="default">Include Images</ThemedText>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {imageData.map((doc, i) => (
          <Image style={styles.image} source={{ uri: doc.uri }} key={i} />
        ))}
        {imageData.length === 0 && <ThemedText type="defaultSemiBold">No Image!</ThemedText>}
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
  image: {
    width: width / 2 - 37,
    height: width / 2 - 37,
  },
});
