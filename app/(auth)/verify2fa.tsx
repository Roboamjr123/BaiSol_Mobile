import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import Toast from "react-native-toast-message";

import { router } from "expo-router";

const VerifyAccount = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputsRef = useRef<(TextInput | null)[]>([]); // Store references to the inputs

  const handleInputChange = (value: string, index: number) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus the next input
      if (index < otp.length - 1 && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      const newOtp = [...otp];

      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0 && !otp[index]) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    if (otp.join("").length !== 6 || otp.includes("")) {
      Toast.show({
        text1: "Warning",
        text2: "Please enter a valid 6-digit OTP.",
        type: "warning",
        position: "top",
      });
      setIsSubmitting(false);
      return;
    } else {
      Toast.show({
        text1: "Success",
        text2: "Proceeding to Home",
        type: "success",
        position: "top",
      });
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        router.push("/(tabs)/home");
      }, 1000);
      return;
    }
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
          <Text className="text-2xl text-black text-semibold mt-6 font-psemibold">
            Two-Factor Authentication
          </Text>

          <Text className="text-sm text-black-100 mt-6 font-pregular">
            Enter the 6-digit verification code that was sent to your email
            account.
          </Text>

          <View className="flex-row justify-center gap-2 mt-6">
            {otp.map((text, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-[50px] h-[65px] rounded-xl border-2 border-gray-300 text-center text-[18px] text-black focus:border-secondary"
                keyboardType="numeric"
                maxLength={1}
                value={text}
                onChangeText={(value) => handleInputChange(value, index)}
                onKeyPress={(e) => handleKeyDown(e, index)}
              />
            ))}
          </View>

          <CustomButton
            title="Submit"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyAccount;
