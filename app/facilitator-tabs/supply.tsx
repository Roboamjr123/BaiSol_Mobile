import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
// import RequestSupply from "@/components/RequestSupply";

// Mock sample data for materials
const mockAssignedMaterials = [
  {
    mtlCategory: "Construction Materials",
    details: [
      {
        suppId: 1,
        mtlId: 101,
        mtlDescription: "Cement",
        mtlQuantity: 50,
        mtlUnit: "Bags",
      },
      {
        suppId: 2,
        mtlId: 102,
        mtlDescription: "Steel Rods",
        mtlQuantity: 100,
        mtlUnit: "Pieces",
      },
    ],
  },
  {
    mtlCategory: "Electrical Supplies",
    details: [
      {
        suppId: 3,
        mtlId: 201,
        mtlDescription: "Copper Wires",
        mtlQuantity: 200,
        mtlUnit: "Meters",
      },
      {
        suppId: 4,
        mtlId: 202,
        mtlDescription: "Light Bulbs",
        mtlQuantity: 30,
        mtlUnit: "Units",
      },
    ],
  },
];

// Mock sample data for equipment
const mockAssignedEquipment = [
  {
    eqptCategory: "Heavy Machinery",
    details: [
      {
        suppId: 5,
        eqptCode: "EQ001",
        eqptDescript: "Excavator",
        quantity: 2,
        eqptUnit: "Units",
      },
      {
        suppId: 6,
        eqptCode: "EQ002",
        eqptDescript: "Bulldozer",
        quantity: 1,
        eqptUnit: "Units",
      },
    ],
  },
  {
    eqptCategory: "Power Tools",
    details: [
      {
        suppId: 7,
        eqptCode: "EQ003",
        eqptDescript: "Drill Machine",
        quantity: 5,
        eqptUnit: "Units",
      },
      {
        suppId: 8,
        eqptCode: "EQ004",
        eqptDescript: "Angle Grinder",
        quantity: 3,
        eqptUnit: "Units",
      },
    ],
  },
];

const Supply = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const scheme = useColorScheme();

  const styles = {
    background: scheme === "dark" ? "bg-[#161622]" : "bg-white",
    textPrimary: scheme === "dark" ? "text-white" : "text-gray-900",
    textSecondary: scheme === "dark" ? "text-[#B0B0B0]" : "text-gray-600",
    cardBackground: scheme === "dark" ? "bg-[#232533]" : "bg-gray-100",
    headerBackground: scheme === "dark" ? "bg-[#333333]" : "bg-gray-200",
    buttonBackground: scheme === "dark" ? "bg-secondary-100" : "bg-black",
    buttonText: scheme === "dark" ? "text-white" : "text-white",
    iconColor: "white",
  };

  // Render a table row for each item
  const renderSupplyItem = ({ item }: { item: any }) => (
    <View
      className={`flex-row items-center justify-between p-4 ${styles.cardBackground} mb-2 rounded-lg shadow-sm`}
    >
      <Text className={`text-base ${styles.textPrimary} flex-1`}>
        {item.id}
      </Text>
      <Text className={`text-base ${styles.textPrimary} flex-1`}>
        {item.description}
      </Text>
      <Text className={`text-sm ${styles.textSecondary} flex-1 text-center`}>
        {item.unit}
      </Text>
      <Text className={`text-sm ${styles.textSecondary} flex-1 text-center`}>
        {item.quantity}
      </Text>
    </View>
  );

  // Render table header
  const renderHeader = () => (
    <View
      className={`flex-row ${styles.headerBackground} p-4 rounded-lg mb-2 shadow-sm`}
    >
      <Text className={`text-base ${styles.textPrimary} flex-1 font-semibold`}>
        Item no.
      </Text>
      <Text className={`text-base ${styles.textPrimary} flex-1 font-semibold`}>
        Description
      </Text>
      <Text
        className={`text-base ${styles.textPrimary} flex-1 text-center font-semibold`}
      >
        Unit
      </Text>
      <Text
        className={`text-base ${styles.textPrimary} flex-1 text-center font-semibold`}
      >
        Quantity
      </Text>
    </View>
  );

  // Transform materials data
  const materials = mockAssignedMaterials.flatMap((category) =>
    category.details?.map((item) => ({
      id: item.mtlId,
      description: item.mtlDescription,
      quantity: item.mtlQuantity || 0,
      unit: item.mtlUnit,
    }))
  );

  // Transform equipment data
  const equipment = mockAssignedEquipment.flatMap((category) =>
    category.details?.map((item) => ({
      id: item.eqptCode,
      description: item.eqptDescript,
      quantity: item.quantity,
      unit: item.eqptUnit,
    }))
  );

  return (
    <SafeAreaView className={`flex-1 ${styles.background} p-4`}>
      <Text className={`text-3xl font-extrabold mb-5 ${styles.textPrimary}`}>
        Supplies
      </Text>

      {/* Materials Section */}
      <Text className={`text-xl font-semibold ${styles.textPrimary} mb-4`}>
        Materials
      </Text>
      <FlatList
        data={materials}
        keyExtractor={(item) => `material-${item.id}`}
        renderItem={renderSupplyItem}
        ListHeaderComponent={renderHeader}
        className="mb-6"
      />

      {/* Equipment Section */}
      <Text className={`text-xl font-semibold ${styles.textPrimary} mb-4`}>
        Equipment
      </Text>
      <FlatList
        data={equipment}
        keyExtractor={(item) => `equipment-${item.id}`}
        renderItem={renderSupplyItem}
        ListHeaderComponent={renderHeader}
        className="mb-4"
      />

      {/* <TouchableOpacity
        onPress={openModal}
        className={`flex-row items-center justify-between px-4 py-3 rounded-md ${styles.buttonBackground}`}
      >
        <Text className={`text-md font-semibold ${styles.buttonText}`}>
          Request a supply?
        </Text>
        <Ionicons name="arrow-forward" size={20} color={styles.iconColor} />
      </TouchableOpacity> */}

      {/* <RequestSupply isVisible={isModalVisible} onClose={closeModal} /> */}
    </SafeAreaView>
  );
};

export default Supply;
