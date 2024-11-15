import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { getProjectById, getUserById } from "../constants/SampleData";
import { SafeAreaView } from "react-native-safe-area-context";
import { projects } from "@/constants/SampleData";

// Function to format date
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  return formattedDate;
};

interface ProjectInfoProps {
  projectId: number;
  onClose: () => void;
}

export const ProjectInfoModal = ({ projectId, onClose }: ProjectInfoProps) => {
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <View className="flex justify-center items-center h-full bg-black bg-opacity-50">
        <Text className="text-white">Project not found!</Text>
      </View>
    );
  }

  const customer = getUserById(project.customerId);
  const facilitator = getUserById(project.facilitatorId);

  return (
    <Modal transparent animationType="fade">
      <SafeAreaView className="flex justify-center items-center bg-black bg-opacity-50 h-full">
        <View className="w-4/5 p-5 bg-white rounded-lg shadow-lg">
          <Text className="text-2xl font-bold text-gray-800">
            {project.name}
          </Text>
          <ScrollView className="mt-3">
            <Text className="text-lg font-semibold text-gray-600">
              Description:
            </Text>
            <Text className="text-sm text-gray-700">{project.description}</Text>

            <Text className="text-lg font-semibold text-gray-600 mt-3">
              Customer:
            </Text>
            <Text className="text-sm text-gray-700">
              {customer ? `${customer.name} (${customer.email})` : "Unknown"}
            </Text>

            <Text className="text-lg font-semibold text-gray-600 mt-3">
              Facilitator:
            </Text>
            <Text className="text-sm text-gray-700">
              {facilitator
                ? `${facilitator.name} (${facilitator.email})`
                : "Unknown"}
            </Text>

            <Text className="text-lg font-semibold text-gray-600 mt-3">
              Start Date:
            </Text>
            <Text className="text-sm text-gray-700">
              {formatDate(project.startDate)}
            </Text>

            <Text className="text-lg font-semibold text-gray-600 mt-3">
              End Date:
            </Text>
            <Text className="text-sm text-gray-700">
              {formatDate(project.endDate)}
            </Text>

            <Text className="text-lg font-semibold text-gray-600 mt-3">
              Status:
            </Text>
            <Text className="text-sm text-gray-700">{project.status}</Text>
          </ScrollView>
          <TouchableOpacity
            onPress={onClose}
            className="mt-5 px-4 py-2 bg-red-500 rounded-lg justify-center items-center"
          >
            <Text className="text-white font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const ProjectInfo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const handleOpenModal = (projectId: number) => {
    setSelectedProjectId(projectId);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProjectId(null);
  };

  return (
    <SafeAreaView className="flex-1 p-5 bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800">Projects</Text>
      {projects.map((project) => (
        <TouchableOpacity
          key={project.projectId}
          className="mt-3 p-4 bg-white rounded-lg shadow-md"
          onPress={() => handleOpenModal(project.projectId)}
        >
          <Text className="text-xl font-semibold text-gray-800">
            {project.name}
          </Text>
          <Text className="text-sm text-gray-600">
            Status: {project.status}
          </Text>
        </TouchableOpacity>
      ))}
      {modalVisible && selectedProjectId !== null && (
        <ProjectInfoModal
          projectId={selectedProjectId}
          onClose={handleCloseModal}
        />
      )}
    </SafeAreaView>
  );
};

export default ProjectInfo;
