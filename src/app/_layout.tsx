import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "tarjetas" }}
        ></Stack.Screen>
        <Stack.Screen
          name="detail"
          options={{ title: "detalle" }}
        ></Stack.Screen>
      </Stack>
    </SafeAreaProvider>
  );
}
