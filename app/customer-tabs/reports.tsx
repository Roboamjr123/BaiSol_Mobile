import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ReportsData from "../../constants/ReportsDataForCustomer";
import { images } from "@/constants";

// Define types for reports
type Report = {
  id: number;
  taskName: string;
  plannedStartDate: string;
  plannedEndDate: string;
  isEnable: boolean;
  isFinished: boolean;
  proofImage?: string | null;
};

const CustomerReports = () => {
  const [tasks] = useState<Report[]>(ReportsData);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const renderSelectedReport = () => {
    if (!selectedReport) return null;

    return (
      <SafeAreaView className="flex-1 bg-gray-100">
        <ScrollView className="px-3 py-6">
          <TouchableOpacity
            onPress={() => setSelectedReport(null)}
            className="mb-4"
          >
            <Text className="text-blue-500 text-lg font-medium">
              {"< Back"}
            </Text>
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {selectedReport.taskName}
          </Text>
          <Text className="text-lg text-gray-600 mb-2">
            Start: {new Date(selectedReport.plannedStartDate).toDateString()}
          </Text>
          <Text className="text-lg text-gray-600 mb-4">
            End: {new Date(selectedReport.plannedEndDate).toDateString()}
          </Text>
          <Text className="text-lg text-gray-600 mb-4">
            Status: {selectedReport.isFinished ? "Completed" : "Pending"}
          </Text>

          <View className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
            <Text className="text-lg font-semibold mb-2">Proof of Task</Text>
            <View className="border border-gray-300 rounded-lg h-40 justify-center items-center mb-4">
              {selectedReport.proofImage ? (
                <Image
                  source={selectedReport.proofImage}
                  className="w-full h-full"
                />
              ) : (
                <Text className="text-gray-400">
                  No proof of task has been uploaded.
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const renderReport = ({ item }: { item: Report }) => (
    <TouchableOpacity
      onPress={() => setSelectedReport(item)}
      className="p-4 rounded-lg shadow-sm my-2 flex-row justify-between items-center bg-white"
    >
      <View>
        <Text className="text-lg font-semibold text-gray-800">
          {item.taskName}
        </Text>
        <Text className="text-sm text-gray-500">
          {new Date(item.plannedStartDate).toDateString()} -{" "}
          {new Date(item.plannedEndDate).toDateString()}
        </Text>
        <Text className="text-sm text-gray-600">
          Status: {item.isFinished ? "Completed" : "Pending"}
        </Text>
      </View>
      <View className="bg-blue-500 rounded-full px-3 py-1">
        <Text className="text-white text-sm font-medium">View</Text>
      </View>
    </TouchableOpacity>
  );

  return selectedReport ? (
    renderSelectedReport()
  ) : (
    <SafeAreaView className="flex-1 bg-gray-100 py-12 px-4">
      <Text className="text-2xl font-black text-gray-800 mb-4 tracking-wide text-center">
        TASK REPORTS
      </Text>
      <FlatList
        data={tasks}
        renderItem={renderReport}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default CustomerReports;
