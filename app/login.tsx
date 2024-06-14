import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import { Redirect, router } from "expo-router";
import { useSession } from "@/providers/authProvider";
import { findUser } from "@/utils/storage";
import { ThemedText } from "@/components/ThemedText";
import ThemeTextInput from "@/components/TextInput";

interface InputTypes {
  email: string;
  password: string;
}

export default function Login() {
  const [errors, setErrors] = useState<string[]>(["", ""]);
  const [inputs, setInputs] = useState<InputTypes>({
    email: "",
    password: "",
  });
  const { signIn, session } = useSession();
  const handleLogin = async () => {
    setErrors(["", ""]);
    if (!inputs.email) setErrors(["Enter email", ""]);
    if (!inputs.password) setErrors(["", "Enter password"]);
    try {
      const code = (await findUser(inputs)) as string | null;
      if (!code) return Alert.alert("User not found");
      signIn(code);
      router.replace("/");
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  if (session) {
    return <Redirect href="/" />;
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ThemedText style={styles.headline}>Login Here</ThemedText>

      <View>
        <ThemeTextInput
          value={inputs.email}
          onChangeText={(text) => setInputs((d) => ({ ...d, email: text }))}
          style={styles.inputs}
          placeholder="Enter Email"
        />
        {errors[0] && <Text style={{ color: "red" }}>*{errors?.[0]}</Text>}
      </View>
      <View>
        <ThemeTextInput
          value={inputs.password}
          onChangeText={(pass) => setInputs((d) => ({ ...d, password: pass }))}
          secureTextEntry
          style={styles.inputs}
          placeholder="Enter Password"
        />

        {errors[1] && <Text style={{ color: "red" }}>*{errors?.[1]}</Text>}
      </View>
      <View style={styles.box}>
        <ThemedText>Not Registered yet?</ThemedText>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <ThemedText
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#0082D6",
            }}
          >
            Sign Up
          </ThemedText>
        </TouchableOpacity>
      </View>
      <Button onPress={handleLogin} title="Login" />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  inputs: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    paddingHorizontal: 10,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    gap: 15,
  },
  headline: {
    fontSize: 20,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
