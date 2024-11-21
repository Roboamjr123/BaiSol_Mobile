import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProjectById, getUserById } from "../constants/SampleData";

// Function to format date
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

interface ProjectInfoProps {
  projectId: number;
  onClose: () => void;
}

export const ProjectInfoModal = ({ projectId, onClose }: ProjectInfoProps) => {
  const project = getProjectById(projectId);
  const scheme = useColorScheme(); // Detect the current theme (light or dark)

  if (!project) {
    return (
      <View className="flex justify-center items-center h-full bg-black bg-opacity-50">
        <Text className="text-white">Project not found!</Text>
      </View>
    );
  }

  const customer = getUserById(project.customerId);
  const facilitator = getUserById(project.facilitatorId);

  const textStyle = scheme === "dark" ? "text-[#E0E0E0]" : "text-[#333333]";
  const descriptionStyle =
    scheme === "dark" ? "text-[#B0B0B0]" : "text-[#333333]";
  const modalBackground = scheme === "dark" ? "bg-[#232533]" : "bg-white";
  const overlayBackground =
    scheme === "dark" ? "bg-[#161622] bg-opacity-80" : "bg-black bg-opacity-50";
  const buttonBackground = scheme === "dark" ? "bg-[#FF4747]" : "bg-red-500";

  return (
    <Modal transparent={true} animationType="fade">
      <SafeAreaView
        className={`flex justify-center items-center ${overlayBackground} h-full`}
      >
        <View className={`w-4/5 p-5 rounded-xl shadow-lg ${modalBackground}`}>
          <Text className={`text-2xl font-bold ${textStyle}`}>
            {project.name}
          </Text>
          <ScrollView className="mt-3">
            <Text className={`text-lg font-semibold ${textStyle}`}>
              Description:
            </Text>
            <Text className={`text-sm ${descriptionStyle}`}>
              {project.description}
            </Text>

            <Text className={`text-lg font-semibold ${textStyle} mt-3`}>
              Customer:
            </Text>
            <Text className={`text-sm ${descriptionStyle}`}>
              {customer ? `${customer.name} (${customer.email})` : "Unknown"}
            </Text>

            <Text className={`text-lg font-semibold ${textStyle} mt-3`}>
              Facilitator:
            </Text>
            <Text className={`text-sm ${descriptionStyle}`}>
              {facilitator
                ? `${facilitator.name} (${facilitator.email})`
                : "Unknown"}
            </Text>

            <Text className={`text-lg font-semibold ${textStyle} mt-3`}>
              Start Date:
            </Text>
            <Text className={`text-sm ${descriptionStyle}`}>
              {formatDate(project.startDate)}
            </Text>

            <Text className={`text-lg font-semibold ${textStyle} mt-3`}>
              End Date:
            </Text>
            <Text className={`text-sm ${descriptionStyle}`}>
              {formatDate(project.endDate)}
            </Text>

            <Text className={`text-lg font-semibold ${textStyle} mt-3`}>
              Status:
            </Text>
            <Text className={`text-sm ${descriptionStyle}`}>
              {project.status}
            </Text>
          </ScrollView>
          <TouchableOpacity
            onPress={onClose}
            className={`mt-5 px-4 py-2 rounded-lg justify-center items-center ${buttonBackground}`}
          >
            <Text className="text-white font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
