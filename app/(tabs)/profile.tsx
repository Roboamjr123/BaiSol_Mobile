import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { users } from "../../constants/SampleData";
import { useAuth } from "../auth-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appearance } from "react-native";
import { images, icons } from "@/constants";

// Detect if the current theme is dark or light
const isDarkMode = Appearance.getColorScheme() === "dark";

const Profile = () => {
  const { email } = useAuth();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return (
      <View
        className={`flex-1 justify-center items-center p-4 ${
          isDarkMode ? "bg-[#161622]" : "bg-white"
        }`}
      >
        <Text
          className={`text-2xl font-bold ${
            isDarkMode ? "text-[#E0E0E0]" : "text-[#333333]"
          }`}
        >
          User not found
        </Text>
      </View>
    );
  }

  const logout = () => {};

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-[#161622]" : "bg-[#F9F9F9]"}`}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity className="w-full items-end" onPress={logout}>
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>

        <View className="w-full justify-center items-center mt-6 mb-6 px-4">
          <TouchableOpacity className="flex items-center">
            <View className="w-32 h-32 border border-secondary rounded-full mb-4 justify-center items-center">
              <Image
                source={images.profile}
                className="w-[90%] h-[90%] rounded-full"
                resizeMode="cover"
              />
            </View>

            <Text
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-[#555555]"
              }`}
            >
              {user.name}
            </Text>

            <Text
              className={`text-base tracking-widest mb-2 ${
                isDarkMode ? "text-[#B0B0B0]" : "text-[#555555]"
              }`}
            >
              {user.role.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Info Card */}
        <View
          className={`rounded-xl p-6 my-4 ${
            isDarkMode ? "bg-[#232533]" : "bg-white"
          } shadow-lg`}
        >
          <Text
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-[#E0E0E0]" : "text-[#555555]"
            }`}
          >
            Personal Information
          </Text>

          {[
            { label: "Name", value: user.name },
            { label: "Age", value: user.age },
            { label: "Gender", value: user.gender },
            { label: "Role", value: user.role },
            { label: "Address", value: user.address },
            { label: "Email", value: user.email },
            { label: "Status", value: user.status },
          ].map((item, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center mb-2"
            >
              <Text
                className={`text-base font-semibold ${
                  isDarkMode ? "text-[#B0B0B0]" : "text-[#555555]"
                }`}
              >
                {item.label}:
              </Text>
              <Text
                className={`text-base ${
                  isDarkMode ? "text-[#B0B0B0]" : "text-[#555555]"
                }`}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
