import { StyleSheet, Text, View } from "react-native";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import Toast, {
  BaseToast,
  ToastConfigParams,
} from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  const toastConfig = {
    success: (internalState: ToastConfigParams<{}>) => (
      <BaseToast
        {...internalState}
        style={{ borderLeftColor: "green", backgroundColor: "white" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ color: "black", fontWeight: "bold", fontSize: 17 }}
        text2Style={{ color: "gray", fontSize: 15 }}
      />
    ),
    error: (internalState: ToastConfigParams<{}>) => (
      <BaseToast
        {...internalState}
        style={{ borderLeftColor: "red", backgroundColor: "white" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ color: "black", fontWeight: "bold", fontSize: 17 }}
        text2Style={{ color: "gray", fontSize: 15 }}
      />
    ),
    info: (internalState: ToastConfigParams<{}>) => (
      <BaseToast
        {...internalState}
        style={{ borderLeftColor: "blue", backgroundColor: "white" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ color: "black", fontWeight: "bold", fontSize: 17 }}
        text2Style={{ color: "gray", fontSize: 15 }}
      />
    ),
    warning: (internalState: ToastConfigParams<{}>) => (
      <BaseToast
        {...internalState}
        style={{ borderLeftColor: "orange", backgroundColor: "white" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ color: "black", fontWeight: "bold", fontSize: 17 }}
        text2Style={{ color: "gray", fontSize: 15 }}
      />
    ),
  };

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="/search/[query]" options={{ headerShown: false }}/> */}
      </Stack>

      <Toast config={toastConfig} />
    </>
  );
};

export default RootLayout;
