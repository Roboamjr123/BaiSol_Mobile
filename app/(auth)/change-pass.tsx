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

  const submit = () => {};

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
          />

          <FormField
            title="Confirm New Password"
            value={form.cnpassword}
            handleChangeText={(e) => setForm({ ...form, cnpassword: e })}
            otherStyles="mt-3"
          />

          <CustomButton
            title="Submit"
            handlePress={() => {
              // @ts-ignore
              router.push("/verify2fa");
            }}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePass;
