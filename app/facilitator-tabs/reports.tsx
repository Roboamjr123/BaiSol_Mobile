import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

// Define types for reports
type Report = {
  id: number;
  taskName: string;
  plannedStartDate: string;
  plannedEndDate: string;
  isEnable: boolean;
  isFinished: boolean;
  progress: number;
  taskList: ITaskItem[];
};

type ITaskItem = {
  id: number;
  proofImage: string | null;
  actualStart: string;
  estimationStart: string;
  taskProgress: number;
  isFinish: boolean;
  isEnable: boolean;
  isLate: boolean;
  daysLate: number;
};

const Reports = () => {
  const [tasks, setTasks] = useState<Report[]>([
    {
      id: 1,
      taskName: "Task 1",
      plannedStartDate: "2025-01-01",
      plannedEndDate: "2025-01-10",
      isEnable: true,
      isFinished: false,
      progress: 0,
      taskList: [
        {
          id: 1,
          proofImage: null,
          actualStart: "2025-01-02",
          estimationStart: "2025-01-01",
          taskProgress: 50,
          isFinish: false,
          isEnable: true,
          isLate: true,
          daysLate: 1,
        },
        {
          id: 2,
          proofImage: "image-url-2.png",
          actualStart: "2025-01-03",
          estimationStart: "2025-01-02",
          taskProgress: 30,
          isFinish: false,
          isEnable: true,
          isLate: true,
          daysLate: 1,
        },
        {
          id: 3,
          proofImage: "image-url-3.png",
          actualStart: "2025-01-05",
          estimationStart: "2025-01-03",
          taskProgress: 10,
          isFinish: false,
          isEnable: false,
          isLate: true,
          daysLate: 2,
        },
      ],
    },
    {
      id: 2,
      taskName: "Task 2",
      plannedStartDate: "2025-02-01",
      plannedEndDate: "2025-02-10",
      isEnable: true,
      isFinished: false,
      progress: 20,
      taskList: [
        {
          id: 1,
          proofImage: "image-url-4.png",
          actualStart: "2025-02-02",
          estimationStart: "2025-02-01",
          taskProgress: 20,
          isFinish: false,
          isEnable: true,
          isLate: false,
          daysLate: 0,
        },
      ],
    },
    // Add more tasks if needed
  ]);

  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);

  const toggleExpand = (taskId: number) => {
    setExpandedTaskId((prev) => (prev === taskId ? null : taskId));
  };

  const renderAccordionContent = (task: Report) => {
    return (
      <View className="px-4 py-4 bg-gray-100 rounded-lg">
        <Text className="text-gray-600 mb-2">
          Start: {new Date(task.plannedStartDate).toDateString()}
        </Text>
        <Text className="text-gray-600 mb-2">
          End: {new Date(task.plannedEndDate).toDateString()}
        </Text>
        <Text className="text-gray-600 mb-4">
          Status: {task.isFinished ? "Completed" : "In Progress"}
        </Text>
        <Text className="text-gray-600 mb-4">
          Current Progress: {task.progress}%
        </Text>

        {/* Display taskList items (sub-tasks) */}
        <Text className="text-lg font-semibold text-gray-700">Task List</Text>
        {task.taskList.map((taskItem) => (
          <View
            key={taskItem.id}
            className="border border-gray-300 rounded-lg p-4 bg-white mb-4"
          >
            <Text className="text-md font-semibold">
              Sub-Task: {`Task ${taskItem.id}`}
            </Text>
            <Text className="text-sm text-gray-600">
              Actual Start: {new Date(taskItem.actualStart).toDateString()}
            </Text>
            <Text className="text-sm text-gray-600">
              Estimation Start:{" "}
              {new Date(taskItem.estimationStart).toDateString()}
            </Text>
            <Text className="text-sm text-gray-600">
              Task Progress: {taskItem.taskProgress}%
            </Text>

            {/* Image Display for sub-tasks */}
            <View className="border border-gray-300 rounded-lg p-4 bg-gray-50 mb-4">
              <Text className="text-md font-medium mb-2">Proof Image</Text>
              <View className="border border-gray-300 rounded-lg h-40 justify-center items-center mb-4">
                {taskItem.proofImage ? (
                  <Image
                    source={{ uri: taskItem.proofImage }}
                    className="w-full h-full rounded-lg"
                  />
                ) : (
                  <Text className="text-gray-400">No image available</Text>
                )}
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderReport = ({ item }: { item: Report }) => {
    const isExpanded = expandedTaskId === item.id;

    return (
      <View className="bg-white rounded-lg shadow-md mb-4">
        <TouchableOpacity
          onPress={() => toggleExpand(item.id)}
          className="p-4 flex-row justify-between items-center"
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
              Status: {item.isFinished ? "Completed" : "In Progress"}
            </Text>
          </View>
          <Text className="text-blue-500 font-medium">
            {isExpanded ? "Hide" : "View"}
          </Text>
        </TouchableOpacity>

        {isExpanded && renderAccordionContent(item)}
      </View>
    );
  };

  return (
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
