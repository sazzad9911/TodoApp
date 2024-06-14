import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider } from "@/providers/authProvider";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackHeader from "@/components/BackHeader";
import { StatusBar } from "expo-status-bar";
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';

Notifications.setNotificationHandler({
  handleNotification: async () => {
  
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,  // Sound is handled manually
      shouldSetBadge: true,
    };
  },
});
function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      
      const taskId = notification.request.content.data?.taskId;
      console.log(taskId)
      if (taskId) {
        Linking.openURL(`myapp://details/${taskId}`);
      }
    }

    Notifications.getLastNotificationResponseAsync()
      .then(response => {
        if (!isMounted || !response?.notification) {
          return;
        }
        redirect(response?.notification);
      });

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useNotificationObserver()
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const inset = useSafeAreaInsets();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
       <StatusBar backgroundColor={colorScheme === "dark" ?"#151718":"#fff"} style="auto"/>
      <SessionProvider>
        <View
          style={{
            paddingTop: inset?.top,
            flex: 1,
            paddingBottom: inset.bottom,
          }}
        >
          <Stack>
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen
              name="create-task"
              options={{ header: () => <BackHeader title="Create Task" /> }}
            />
            <Stack.Screen
              name="details/[id]"
              options={{ header: () => <BackHeader title="Task Details" /> }}
            />
            <Stack.Screen
              name="edit/[id]"
              options={{ header: () => <BackHeader title="Edit Task" /> }}
            />
            <Stack.Screen
              name="images/[id]"
              options={{ header: () => <BackHeader title="Edit Task Images" /> }}
            />
            
            <Stack.Screen name="+not-found" />
          </Stack>
        </View>
      </SessionProvider>
    </ThemeProvider>
  );
}
