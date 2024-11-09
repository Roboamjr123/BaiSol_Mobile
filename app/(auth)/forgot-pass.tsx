import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";

const ForgotPass = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  };

  const submit = () => {
    if (!validateEmail(form.email)) {
      setEmailError("Please enter a valid email.");
      setIsSubmitting(false);
    } else {
      setEmailError("");
      setIsSubmitting(true);

      Toast.show({
        text1: "Check your email",
        text2: "A link is sent in your email for resetting your password.",
        type: "success",
        position: "top",
      });

      setTimeout(() => {
        setIsSubmitting(false);

        router.push({
          pathname: "/change-pass",
          params: { email: form.email },
        });
      }, 3000);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[90vh] px-4 my-6">
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            className="w-[80px] h-[80px]"
          />
          <Text className="text-2xl text-black text-semibold mt-6 font-psemibold">
            Forgot<Text className="text-secondary-200"> Password</Text>
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            isError={!!emailError}
            errorMessage={emailError}
          />

          <CustomButton
            title="Confirm"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPass;
