import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/components/Button";
import DateTime from "@/components/DateTime";
import getTimeFromDate from "@/utils/getTimeFromDate";

interface InputTypes {
  image: string;
  title: string;
  date: Date;
  time: Date;
}

export default function CreateTask() {
  const [inputs, setInputs] = useState<InputTypes>({
    image: "",
    title: "",
    date: new Date(),
    time: new Date(),
  });
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);
    setInputs((d) => ({ ...d, date: date }));
  };
  const onChangeTime = (event: any, time: any) => {
    setShowTime(false);
    setInputs((d) => ({ ...d, time: time }));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <View style={{ flex: 1 }}>
            <Image
              source={require("@/assets/images/task.jpg")}
              style={styles.reactLogo}
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <MaterialIcons name="photo-camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
        }
      >
        <TextInput
          value={inputs.title}
          onChangeText={(txt) => setInputs((d) => ({ ...d, title: txt }))}
          style={styles.input}
          placeholder="Title"
        />
        <View style={styles.dateBox}>
          <TouchableOpacity
            onPress={() => setShowDate(true)}
            style={styles.dateButtons}
          >
            <Text style={{ color: "white" }}>{inputs.date.toDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowTime(true)}
            style={styles.dateButtons}
          >
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
        <Button title="Save" />
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
