import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { projectReports } from "@/constants/ReportsSampleData"; // Assuming this is your import path

type Report = {
  referenceNumber: string;
  reportType: "Payment" | "Progress" | "Deadline"; 
  description: string;
  status: "paid" | "unpaid" | "in-progress" | "completed" | "upcoming";
  completedPercentage?: number; 
  dueDate?: string; 
  acknowledgedBy?: string; 
  acknowledgedAt?: string;
  reportDate?: string; 
  message: string;
};

const Reports = () => {
  const scheme = useColorScheme();

  const styles = {
    background: scheme === "dark" ? "bg-[#161622]" : "bg-[#F9F9F9]",
    textPrimary: scheme === "dark" ? "text-white" : "text-[#555555]",
    textSecondary: scheme === "dark" ? "text-[#B0B0B0]" : "text-[#555555]",
    cardBackground: scheme === "dark" ? "bg-[#232533]" : "bg-white",
  };

  // Render report item
  const renderReport = ({ item }: { item: Report }) => {
    const {
      referenceNumber,
      reportType,
      description,
      status,
      completedPercentage,
      dueDate,
      acknowledgedBy,
      acknowledgedAt,
      message,
      reportDate,
    } = item;

    return (
      <View className={`${styles.cardBackground} p-4 rounded-lg mb-4 shadow-md`}>
        <Text className={`${styles.textPrimary} text-lg font-bold`}>Reference: {referenceNumber}</Text>
        <Text className={`${styles.textSecondary} text-base`}>Description: {description}</Text>
        {reportType === "Progress" && (
          <Text className={`${styles.textSecondary} text-sm`}>
            Status:{" "}
            <Text
              className={`font-semibold ${
                status === "completed" ? "text-green-600" : "text-orange-600"
              }`}
            >
              {completedPercentage}% Completed
            </Text>
            {reportDate && <Text className={`${styles.textSecondary} text-sm`}> Reported on: {reportDate}</Text>}
          </Text>
        )}
        {reportType === "Deadline" && (
          <Text className={`${styles.textSecondary} text-sm`}>
            Status:{" "}
            <Text className={`font-semibold text-red-600`}>Upcoming</Text>
            {dueDate && <Text className={`${styles.textSecondary} text-sm`}> Due Date: {dueDate}</Text>}
          </Text>
        )}
        {reportType === "Payment" && (
          <Text className={`${styles.textSecondary} text-sm`}>
            Status:{" "}
            <Text
              className={`font-semibold ${
                status === "paid" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.toUpperCase()}
            </Text>
            {acknowledgedBy && (
              <>
                <Text className={`${styles.textSecondary} text-sm`}> Acknowledged By: {acknowledgedBy}</Text>
                <Text className={`${styles.textSecondary} text-sm`}> Acknowledged At: {acknowledgedAt}</Text>
              </>
            )}
          </Text>
        )}
        <Text className={`${styles.textPrimary} mt-2 text-gray-600`}>{message}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className={`${styles.background} flex-1 p-4`}>
      <Text className={`${styles.textPrimary} text-xl font-bold text-center mb-4`}>Project Status Reports</Text>
      <FlatList
        data={projectReports as Report[]} // Ensure the data is typed correctly
        keyExtractor={(item) => item.referenceNumber}
        renderItem={renderReport}
        ListEmptyComponent={
          <Text className={`${styles.textSecondary} text-center mt-8`}>
            No reports available.
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default Reports;
