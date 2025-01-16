import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define the IEquipmentDetails interface
interface IEquipmentDetails {
  suppId: number; // Required integer field
  eqptCode: string; // Required string field
  eqptDescript: string; // Required string field
  quantity: number; // Required integer field
  eqptUnit: string; // Required string field
}

// Define the IAssignedEquipment interface
export interface IAssignedEquipment {
  eqptCategory: string; // Required string field
  details?: IEquipmentDetails[]; // Optional list of IEquipmentDetails
}

// Sample data for assigned equipment
const sampleAssignedEquipment: IAssignedEquipment[] = [
  {
    eqptCategory: "Heavy Machinery",
    details: [
      {
        suppId: 1,
        eqptCode: "EQ-001",
        eqptDescript: "Excavator",
        quantity: 3,
        eqptUnit: "Units",
      },
    ],
  },
  {
    eqptCategory: "Construction Tools",
    details: [
      {
        suppId: 3,
        eqptCode: "EQ-003",
        eqptDescript: "Cement Mixer",
        quantity: 5,
        eqptUnit: "Units",
      },
    ],
  },
];

const Request = ({
  equipment,
  onClose,
}: {
  equipment: IAssignedEquipment[];
  onClose: () => void;
}) => {
  const renderEquipmentItem = ({ item }: { item: IEquipmentDetails }) => (
    <View className="flex-row items-center justify-between p-4 mb-2 rounded-lg shadow-sm bg-gray-100">
      <Text className="text-base text-gray-900 flex-1">{item.eqptCode}</Text>
      <Text className="text-base text-gray-900 flex-1">
        {item.eqptDescript}
      </Text>
      <Text className="text-sm text-gray-600 flex-1 text-center">
        {item.eqptUnit}
      </Text>
      <Text className="text-sm text-gray-600 flex-1 text-center">
        {item.quantity}
      </Text>
    </View>
  );

  const renderCategoryHeader = (category: string) => (
    <View className="bg-gray-200 p-4 rounded-lg mb-2 shadow-sm">
      <Text className="text-lg font-semibold text-gray-900">{category}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-3xl font-extrabold mb-5 text-gray-900">
        Equipment Requests
      </Text>
      {equipment.map((category) => (
        <View key={category.eqptCategory}>
          {renderCategoryHeader(category.eqptCategory)}
          <FlatList
            data={category.details}
            keyExtractor={(item) => item.eqptCode}
            renderItem={renderEquipmentItem}
            className="mb-4"
          />
        </View>
      ))}
    </SafeAreaView>
  );
};

export default () => (
  <Request equipment={sampleAssignedEquipment} onClose={() => {}} />
);
