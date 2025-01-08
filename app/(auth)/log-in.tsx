import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { useAuth } from "../auth-context";
import { users } from "../../constants/SampleData";
import Toast from "react-native-toast-message";

const LogIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { setEmail } = useAuth();

  const validateEmail = (email: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  };

  const handleSubmit = () => {
    const { email, password } = form;
    let hasError = false;
    const newErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email.";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password cannot be empty.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fix the highlighted errors.",
      });
      return;
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "User not found.",
      });
      return;
    }

    if (user.role === "Facilitator") {
      router.push({ pathname: "/facilitator-tabs/home" });
    } else if (user.role === "Customer") {
      router.push({ pathname: "/customer-tabs/home" });
    } else {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Role not recognized.",
      });
      return;
    }

    setEmail(email);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            className="w-[80px] h-[80px]"
          />
          <Text className="text-2xl text-black font-semibold mt-6">
            Login to <Text className="text-secondary-200">BaiSol</Text>
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            isError={!!errors.email}
            errorMessage={errors.email}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
            isError={!!errors.password}
            errorMessage={errors.password}
          />

          <CustomButton
            title="Login"
            handlePress={handleSubmit}
            containerStyles="mt-7"
          />

          <View className="justify-center pt-5 flex-row gap-1">
            <TouchableOpacity onPress={() => router.push("/forgot-pass")}>
              <Text className="text-sm font-semibold text-secondary-300">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default LogIn;
