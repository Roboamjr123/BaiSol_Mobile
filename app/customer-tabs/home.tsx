// Dashboard

import { View, Text, ScrollView, useColorScheme, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router} from "expo-router";
import { useAuth } from "../auth-context";
import { users, getProjectsByUserId } from "../../constants/SampleData";

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

  const handleProjectPayment = (projectId: number) => {
    router.push(`/customer/bill-payment?projectId=${projectId}`);
  };

  return (
    <SafeAreaView className={`flex-1 ${styles.background}`}>
      <View className="w-full py-4 px-6 shadow-md">
        <Text className={`text-3xl font-bold ${styles.textPrimary} tracking-wide`}>
          Hello, <Text className="capitalize">{firstName}!</Text>
        </Text>
        <Text className={`text-sm font-bold mt-10 ${styles.textSecondary} tracking-wide`}>
          These are your projects:
        </Text>
      </View>

      {/* Projects */}
      <ScrollView className="flex-1 mt-4 px-6">
        {userProjects.length === 0 ? (
          <Text className={`${styles.textSecondary} text-center`}>No projects found.</Text>
        ) : (
          userProjects.map((project) => (
            <TouchableOpacity
              key={project.projectId}
              className={`p-4 mb-4 ${styles.cardBackground} rounded-lg shadow-md`}
              onPress={() => handleProjectPayment(project.projectId)}
            >
              <Text className={`text-xl font-semibold ${styles.textPrimary}`}>
                {project.name}
              </Text>
              <Text className={`text-sm ${styles.textSecondary}`}>
                {project.description}
              </Text>
              <Text className={`text-xs mt-2 ${styles.textSecondary}`}>
                Status: {project.status} | {project.startDate} - {project.endDate}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      

    </SafeAreaView>
  );
};

export default Home;
