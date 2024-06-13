import {
  Image,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TaskCard from "@/components/TaskCard";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/task.jpg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Tasks</ThemedText>
        <TouchableOpacity onPress={()=>router.push("/create-task")}>
          <Feather name="plus-circle" size={26} color="green" />
        </TouchableOpacity>
      </ThemedView>
      {[45, 34, 23, 3, 3, 3, 2, 2, 2, 2, 3].map((d, i) => (
        <TaskCard key={i} />
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
