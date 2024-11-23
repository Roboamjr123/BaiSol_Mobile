// Dashboard

import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useAuth } from "../auth-context";

const Home = () => {
  const { email } = useAuth();

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-primary p-3">
      <Text className="text-center text-lg text-black">
        Welcome to BaiSol {""}
        <Text className="text-secondary-300">{email}</Text>
      </Text>
      
    </SafeAreaView>
  );
};

export default Home;
