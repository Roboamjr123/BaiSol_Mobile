import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ReportsData from "../../constants/ReportsData";

// Define types for reports and selected report
// Define types for reports and selected report
type Report = {
  id: number;
  taskName: string;
  plannedStartDate: string;
  plannedEndDate: string;
  startDate: string;
  endDate: string;
  isEnable: boolean;
  isFinished: boolean;
  taskProgress: number;
  proofImage: string | null;
  actualStart: string;
  estimationStart: string;
  isLate: boolean;
  isStarting: boolean;
  daysLate: number;
};

const Reports = () => {
  const [tasks, setTasks] = useState<Report[]>(ReportsData);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [image1, setImage1] = useState<string | null>(null);
  const [progressInput, setProgressInput] = useState<string>("");

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

  // Function to check the starting and late status
  const updateTaskStatus = (task: Report) => {
    const currentDate = new Date();
    const plannedStartDate = new Date(task.plannedStartDate);
    const plannedEndDate = new Date(task.plannedEndDate);

    const isStarting =
      currentDate >= plannedStartDate && currentDate <= plannedEndDate;
    const isLate = currentDate > plannedEndDate && !task.isFinished;

    return { isStarting, isLate };
  };

  useEffect(() => {
    const updatedTasks = tasks.map((task) => {
      const { isStarting, isLate } = updateTaskStatus(task);
      return { ...task, isStarting, isLate };
    });

    setTasks(updatedTasks);
  }, []); // Update status on mount

  const handleProgressChange = (value: string) => {
    // Ensure the value is a valid number between 0 and 100
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
      setProgressInput(value);
    } else {
      Alert.alert(
        "Invalid input",
        "Please enter a valid progress percentage (0-100)."
      );
    }
  };

  const handleSubmit = () => {
    if (!selectedReport) return;

    const progress = parseInt(progressInput, 10);

    // If progress is 100%, finish the task
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedReport.id
          ? {
              ...task,
              isFinished: progress === 100,
              isEnable: false,
              taskProgress: progress,
            }
          : task
      )
    );

    Alert.alert(
      "Success",
      progress === 100 ? "Task has been completed!" : "Progress updated!"
    );
    setSelectedReport(null);
    setProgressInput(""); // Reset the progress input field after submission
  };

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
            Start: {new Date(selectedReport.startDate).toDateString()}
          </Text>
          <Text className="text-lg text-gray-600 mb-4">
            End: {new Date(selectedReport.endDate).toDateString()}
          </Text>
          <Text className="text-lg text-gray-600 mb-4">
            Status:{" "}
            {selectedReport.isFinished
              ? "Completed"
              : selectedReport.isEnable
              ? "In Progress"
              : "Not Started"}
          </Text>

          <Text className="text-lg text-gray-600 mb-4">
            Progress: {selectedReport.taskProgress}%
          </Text>

          {/* Editable Progress Field */}
          {!selectedReport.isFinished && (
            <View className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
              <Text className="text-lg font-semibold mb-2">
                Update Progress
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 8,
                  padding: 10,
                  fontSize: 16,
                }}
                placeholder="Enter progress percentage (0-100)"
                keyboardType="numeric"
                value={progressInput}
                onChangeText={handleProgressChange}
              />
            </View>
          )}

          {/* Displaying proof image if available */}
          {selectedReport.proofImage && (
            <Image
              source={{ uri: selectedReport.proofImage }}
              className="w-full h-48 mb-4 rounded-lg"
            />
          )}

          {/* Image upload section */}
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

          {/* Submit button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={selectedReport.isFinished || !progressInput}
            className={`py-3 rounded-lg items-center ${
              selectedReport.isFinished || !progressInput
                ? "bg-gray-400"
                : "bg-orange-500"
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
          {new Date(item.startDate).toDateString()} -{" "}
          {new Date(item.endDate).toDateString()}
        </Text>
        <Text className="text-sm text-gray-600">
          Status:{" "}
          {item.isFinished
            ? "Completed"
            : item.isEnable
            ? "In Progress"
            : "Not Started"}
        </Text>

        {/* Displaying Progress in task list */}
        <Text className="text-sm text-gray-600 mt-2">
          Progress: {item.taskProgress}%
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
      <Text className="text-3xl font-extrabold text-gray-800 mb-4">
        Reports
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

export default Reports;
