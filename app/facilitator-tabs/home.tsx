// Dashboard

import { View, Text, useColorScheme } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useAuth } from "../auth-context";
import { getProjectsByUserId, users } from "@/constants/SampleData";

const Home = () => {
  const { email } = useAuth();
  const user = users.find((user) => user.email === email);

  const scheme = useColorScheme();

  const styles = {
    background: scheme === "dark" ? "bg-[#161622]" : "bg-[#F9F9F9]",
    textPrimary: scheme === "dark" ? "text-white" : "text-[#555555]",
    textSecondary: scheme === "dark" ? "text-[#B0B0B0]" : "text-[#555555]",
    cardBackground: scheme === "dark" ? "bg-[#232533]" : "bg-white",
  };

  const firstName = user?.name?.split(" ")[0] || "User";
  const userProjects = getProjectsByUserId(user?.id || 0);

  return (
    <SafeAreaView className={`flex-1 ${styles.background}`}>
      <View className="w-full py-4 px-6 shadow-md">
        <Text
          className={`text-3xl font-bold ${styles.textPrimary} tracking-wide`}
        >
          Hello, <Text className="capitalize">{firstName}!</Text>
        </Text>
      </View>

      {/* PROJECTS OF THE FACILITATOR HERE */}
    </SafeAreaView>
  );
};

export default Home;
