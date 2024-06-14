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
import { useEffect, useState } from "react";
import { useSession } from "@/providers/authProvider";
import { useIsFocused } from "@react-navigation/native";
import { allTask, deleteTask } from "@/utils/storage";


interface TasksTypes {
  title: string;
  image: string;
  id: string;
  dueDate: Date;
  date: Date;
  user: string;
  check: boolean;
}


export default function HomeScreen() {
  const [data, setData] = useState<TasksTypes[]>([]);
  const { session } = useSession();
  const isFocused = useIsFocused();
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const getData = async () => {
      try {
        const localData = await allTask(session as string);
        setData(localData);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [isFocused, reload]);
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/task.jpg")}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Tasks</ThemedText>
        <TouchableOpacity onPress={() => router.push("/create-task")}>
          <Feather name="plus-circle" size={26} color="green" />
        </TouchableOpacity>
      </ThemedView>
      {data.map((doc, i) => (
        <TaskCard
          dueDate={doc.dueDate}
          title={doc.title}
          id={doc.id}
          check={doc.check}
          onDelete={async () => {
            await deleteTask(doc.id);
            setReload(Math.random());
          }}
          key={i}
        />
      ))}
      {data.length === 0 && (
        <ThemedText type="defaultSemiBold">No Tasks!</ThemedText>
      )}
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
