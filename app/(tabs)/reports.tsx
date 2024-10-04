import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Reports = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Text className="text-center">Reports</Text>
      </View>
    </SafeAreaView>
  );
};

export default Reports;
