import { View, Text, FlatList } from "react-native";
import React from "react";
import { users } from "../../constants/SampleData";
import { Appearance } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Detect if the current theme is dark or light
const isDarkMode = Appearance.getColorScheme() === "dark";

const Customers = () => {
  // Filter users by role 'Customer'
  const customers = users.filter(user => user.role === "Customer");

  return (
    <SafeAreaView className={`flex-1 p-4 ${isDarkMode ? "bg-[#161622]" : "bg-[#F9F9F9]"}`}>
      <Text className={`text-3xl font-extrabold mb-5 ${isDarkMode ? "text-white" : "text-[#333333]"}`}>
        Customers
      </Text>
      
      {/* Display customer list */}
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            className={`rounded-xl p-4 my-2 ${isDarkMode ? "bg-[#232533]" : "bg-white"} shadow-lg`}
          >
            <Text className={`text-xl font-semibold ${isDarkMode ? "text-[#E0E0E0]" : "text-[#333333]"} mb-2`}>
              {item.name}
            </Text>
            <Text className={`text-base ${isDarkMode ? "text-[#B0B0B0]" : "text-[#555555]"} mb-1`}>
              <Text className="font-semibold">Age: </Text>{item.age}
            </Text>
            <Text className={`text-base ${isDarkMode ? "text-[#B0B0B0]" : "text-[#555555]"} mb-1`}>
              <Text className="font-semibold">Gender: </Text>{item.gender}
            </Text>
            <Text className={`text-base ${isDarkMode ? "text-[#B0B0B0]" : "text-[#555555]"} mb-1`}>
              <Text className="font-semibold">Address: </Text>{item.address}
            </Text>
            <Text className={`text-base ${isDarkMode ? "text-[#B0B0B0]" : "text-[#555555]"} mb-1`}>
              <Text className="font-semibold">Email: </Text>{item.email}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Customers;
