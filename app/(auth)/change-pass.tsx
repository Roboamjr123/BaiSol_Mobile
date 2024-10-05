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
import { Link, router, useLocalSearchParams } from "expo-router";

const ChangePass = () => {
  const { email } = useLocalSearchParams();
  const emailValue = Array.isArray(email) ? email[0] : email || "";

  const [form, setForm] = useState({
    email: emailValue,
    npassword: "",
    cnpassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Function to validate password
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const submit = () => {
    const { npassword, cnpassword } = form;

    if (!validatePassword(npassword)) {
      setError(
        "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    // Check if passwords match
    if (npassword !== cnpassword) {
      setError("Passwords do not match.");
      return;
    }

    // If validation passes, clear error and proceed
    setError(undefined);
    setIsSubmitting(true);

    // Simulate submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(true);
      
      router.push("/(tabs)/home");
    }, 1000);

  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            className="w-[80px] h-[80px]"
          />
          <Text className="text-2xl text-black text-semibold mt-6 font-psemibold">
            Change <Text className="text-secondary-200">Password</Text>
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            editable={false}
          />

          <FormField
            title="New Password"
            value={form.npassword}
            handleChangeText={(e) => setForm({ ...form, npassword: e })}
            otherStyles="mt-3"
            isError={!!error}
            errorMessage={error}
          />

          <FormField
            title="Confirm New Password"
            value={form.cnpassword}
            handleChangeText={(e) => setForm({ ...form, cnpassword: e })}
            otherStyles="mt-3"
            isError={!!error}
          />

          <CustomButton
            title="Submit"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePass;
