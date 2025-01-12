// Reports.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ReportsData from "../../constants/ReportsData";

// Define types for reports and selected report
type Report = {
  id: number;
  taskName: string;
  plannedStartDate: string;
  plannedEndDate: string;
  isEnable: boolean;
  isFinished: boolean;
};

const Reports = () => {
  const [tasks, setTasks] = useState<Report[]>(ReportsData);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [image1, setImage1] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "You need to grant permission to access the photo library."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length) {
        const source = result.assets[0].uri;
        setImage1(source);
        console.log("Image selected: ", source);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
      Alert.alert("Error", "Something went wrong while picking the image.");
    }
  };

  const handleSubmit = () => {
    if (!selectedReport) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedReport.id
          ? { ...task, isFinished: true, isEnable: false }
          : task
      )
    );

    Alert.alert("Success", "Task has been submitted!");
    setSelectedReport(null);
  };

  const renderSelectedReport = () => {
    if (!selectedReport) return null;

    return (
      <SafeAreaView className="flex-1 bg-gray-100">
        <ScrollView className="px-3 py-6">
          <TouchableOpacity onPress={() => setSelectedReport(null)} className="mb-4">
            <Text className="text-blue-500 text-lg font-medium">{"< Back"}</Text>
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
            Status:{" "}
            {selectedReport.isFinished
              ? "Completed"
              : selectedReport.isEnable
              ? "In Progress"
              : "Not Started"}
          </Text>

          {!selectedReport.isFinished && (
            <View className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
              <Text className="text-lg font-semibold mb-2">Upload Image</Text>
              <View className="border border-gray-300 rounded-lg h-40 justify-center items-center mb-4">
                {image1 ? (
                  <Image
                    source={{ uri: image1 }}
                    className="w-full h-full rounded-lg"
                  />
                ) : (
                  <Text className="text-gray-400">No image selected</Text>
                )}
              </View>
              <TouchableOpacity
                onPress={pickImage}
                className="bg-green-500 py-3 rounded-lg items-center"
              >
                <Text className="text-white font-medium">Choose Image</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={selectedReport.isFinished}
            className={`py-3 rounded-lg items-center ${
              selectedReport.isFinished ? "bg-gray-400" : "bg-orange-500"
            }`}
          >
            <Text className="text-white font-semibold text-lg">
              {selectedReport.isFinished ? "Already Submitted" : "Submit"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const renderReport = ({ item }: { item: Report }) => (
    <TouchableOpacity
      onPress={() => !item.isFinished && setSelectedReport(item)}
      disabled={item.isFinished}
      className={`p-4 rounded-lg shadow-sm my-2 flex-row justify-between items-center ${
        item.isFinished ? "bg-gray-200" : "bg-white"
      }`}
    >
      <View>
        <Text
          className={`text-lg font-semibold ${
            item.isFinished ? "text-gray-500" : "text-gray-800"
          }`}
        >
          {item.taskName}
        </Text>
        <Text className="text-sm text-gray-500">
          {new Date(item.plannedStartDate).toDateString()} -{" "}
          {new Date(item.plannedEndDate).toDateString()}
        </Text>
        <Text className="text-sm text-gray-600">
          Status:{" "}
          {item.isFinished
            ? "Completed"
            : item.isEnable
            ? "In Progress"
            : "Not Started"}
        </Text>
      </View>
      {!item.isFinished && (
        <View className="bg-blue-500 rounded-full px-3 py-1">
          <Text className="text-white text-sm font-medium">View</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return selectedReport ? (
    renderSelectedReport()
  ) : (
    <SafeAreaView className="flex-1 bg-gray-100 py-12 px-4">
      <Text className="text-3xl font-extrabold text-gray-800 mb-4">Reports</Text>
      <FlatList
        data={tasks}
        renderItem={renderReport}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Reports;
