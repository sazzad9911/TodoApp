import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/components/Button";
import DateTime from "@/components/DateTime";
import getTimeFromDate from "@/utils/getTimeFromDate";
import * as ImagePicker from "expo-image-picker";
import { useSession } from "@/providers/authProvider";
import { getTask, storeTask, updateTask } from "@/utils/storage";
import { router, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import ThemeTextInput from "@/components/TextInput";
import { useIsFocused } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

interface InputTypes {
  title: string;
  date: Date;
  time: Date;
}
interface TasksTypes {
  title: string;
  image: string;
  id: string;
  dueDate: Date;
  date: Date;
  user: string;
  check: boolean;
}
async function scheduleNotification(title: string, id: string, dueDate: Date) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Task Reminder",
      body: `${title}`,
      data: { taskId: id },
    },
    trigger: dueDate,
  });
}
export default function Edit() {
  const [inputs, setInputs] = useState<InputTypes>({
    title: "",
    date: new Date(),
    time: new Date(),
  });
  const { id } = useLocalSearchParams();
  const [image, setImage] = useState<string | null>(null);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const { session } = useSession();
  const [data, setData] = useState<TasksTypes>();
  const isFocused = useIsFocused();

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);
    setInputs((d) => ({ ...d, date: date }));
  };
  const onChangeTime = (event: any, time: any) => {
    setShowTime(false);
    setInputs((d) => ({ ...d, time: time }));
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result?.assets?.[0].uri) {
      setImage(result.assets[0].uri);
    }
  };
  const handleSubmit = async () => {
    if (!image || !inputs.title || !inputs.date || !inputs.time) {
      return Alert.alert("Please fill the inputs");
    }

    try {
      const dueDate = new Date(inputs.date);
      dueDate.setHours(inputs.time.getHours());
      dueDate.setMinutes(inputs.time.getMinutes());
      dueDate.setSeconds(inputs.time.getSeconds());
      await updateTask(inputs.title, image, dueDate, id as string);
      scheduleNotification(inputs.title, id as string, dueDate);
      router.back();
    } catch (error: any) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const localData = await getTask(id as string);
        localData &&
          setInputs((d) => ({
            ...d,
            title: localData.title,
            date: new Date(localData.date),
            time: new Date(localData.date),
          }));
        localData && setImage(localData.image);
        setData(localData);
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
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {image ? (
              <Image source={{ uri: image }} style={styles.reactLogo} />
            ) : (
              <ThemedText>No image Uploaded</ThemedText>
            )}
            <TouchableOpacity onPress={pickImage} style={styles.cameraIcon}>
              <MaterialIcons name="photo-camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
        }>
        <ThemeTextInput
          value={inputs.title}
          onChangeText={(txt) => setInputs((d) => ({ ...d, title: txt }))}
          style={styles.input}
          placeholder="Title"
        />
        <View style={styles.dateBox}>
          <TouchableOpacity
            onPress={() => setShowDate(true)}
            style={styles.dateButtons}>
            <Text style={{ color: "white" }}>{inputs.date.toDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowTime(true)}
            style={styles.dateButtons}>
            <Text style={{ color: "white" }}>
              {getTimeFromDate(inputs.time)}
            </Text>
          </TouchableOpacity>
        </View>
        <DateTime
          mode={"date"}
          onChange={onChangeDate}
          date={inputs.date}
          show={showDate}
        />
        <DateTime
          mode={"time"}
          onChange={onChangeTime}
          date={inputs.time}
          show={showTime}
        />
        <Button
          onPress={() => router.push(`/images/${id}`)}
          title="Edit Images"
        />
        <Button onPress={handleSubmit} title="Save" />
      </ParallaxScrollView>
    </KeyboardAvoidingView>
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
