import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, Text } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/providers/authProvider";
import Button from "@/components/Button";
import { router } from "expo-router";
import { HelloWave } from "@/components/HelloWave";

export default function Profile() {
    const {session,signOut}=useSession()
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
       <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText>
        This is your profile section. This account can't be accessible from
        another device
      </ThemedText>
      <Text style={{fontSize:20}}>Your Primary Email</Text>
      <Text>{session?.split("+")[0]}</Text>
      <Button onPress={()=>{
        signOut()
        router.replace("/login")
      }} title="Log Out"/>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
