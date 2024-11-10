import { ScrollView, Text, View } from "react-native";
import React from "react";
import { users } from "../../constants/SampleData";
import { useAuth } from "../auth-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appearance } from "react-native";

// Detect if the current theme is dark or light
const isDarkMode = Appearance.getColorScheme() === "dark";

const Profile = () => {
  const { email } = useAuth();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return (
      <View
        className={`flex-1 justify-center items-center p-4 ${isDarkMode ? "bg-[#161622]" : "bg-white"}`}
      >
        <Text className={`text-2xl font-bold ${isDarkMode ? "text-[#E0E0E0]" : "text-[#333333]"}`}>
          User not found
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-[#161622]" : "bg-[#F9F9F9]"}`}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Title */}
        <Text className={`text-4xl font-extrabold mb-5 ${isDarkMode ? "text-white" : "text-[#333333]"}`}>
          Profile
        </Text>

        {/* Profile Info Card */}
        <View
          className={`rounded-xl p-6 my-4 ${isDarkMode ? "bg-[#232533]" : "bg-white"} shadow-lg`}
        >
          <Text className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-[#E0E0E0]" : "text-[#555555]"}`}>
            Personal Information
          </Text>

          {/* User Info */}
          <Text className={`text-base mb-2 ${isDarkMode ? "text-[#B0B0B0]" : "text-[#555555]"}`}>
            <Text className="font-semibold">Name: </Text>{user.name}
          </Text>
          <Text className={`text-base mb-2 ${isDarkMode ? "text-[#B0B0B0]" : "text-[#555555]"}`}>
            <Text className="font-semibold">Age: </Text>{user.age}
          </Text>
          <Text className={`text-base mb-2 ${isDarkMode ? "text-[#B0B0B0]" : "text-[#555555]"}`}>
            <Text className="font-semibold">Gender: </Text>{user.gender}
          </Text>
          <Text className={`text-base mb-2 ${isDarkMode ? "text-[#B0B0B0]" : "text-[#555555]"}`}>
            <Text className="font-semibold">Role: </Text>{user.role}
          </Text>
          <Text className={`text-base mb-2 ${isDarkMode ? "text-[#B0B0B0]" : "text-[#555555]"}`}>
            <Text className="font-semibold">Address: </Text>{user.address}
          </Text>
          <Text className={`text-base mb-2 ${isDarkMode ? "text-[#B0B0B0]" : "text-[#555555]"}`}>
            <Text className="font-semibold">Email: </Text>{user.email}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
