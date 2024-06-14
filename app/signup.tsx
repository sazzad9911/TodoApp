import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import { Redirect, router } from "expo-router";
import { storeUser } from "@/utils/storage";
import { useSession } from "@/providers/authProvider";
import ThemeTextInput from "@/components/TextInput";
import { ThemedText } from "@/components/ThemedText";
interface InputTypes {
  email: string;
  password: string;
}
export default function SignUp() {
  const [errors, setErrors] = useState<string[]>(["", ""]);
  const [inputs, setInputs] = useState<InputTypes>({
    email: "",
    password: "",
  });
  const { signIn, session } = useSession();
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    setErrors(["", ""]);
    if (!isValidEmail(inputs.email)) setErrors(["Enter valid email", ""]);
    if (!inputs.password) setErrors(["", "Enter password"]);
    try {
      const code = (await storeUser(inputs)) as string | null;
      if (!code) return Alert.alert("Email is already in use");
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
      <ThemedText style={styles.headline}>Sign Up Now</ThemedText>
      <ThemedText>
        This is local sign-up only. The app is not connected with any server.
        Use any valid email and any length password
      </ThemedText>
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

      <Button onPress={handleSignUp} title="Sign Up" />
      <Button onPress={() => router.back()} title="Go Back" />
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
