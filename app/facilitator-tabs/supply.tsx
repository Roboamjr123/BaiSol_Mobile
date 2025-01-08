import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { materialsData, equipmentData } from "../../constants/SupplySampleData";
import { Ionicons } from "@expo/vector-icons";
import RequestSupply from "@/components/RequestSupply";

interface SupplyItem {
  id: number;
  name: string;
  qty: number;
  status: string;
}

const Supply = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const supplies = ({ item }: { item: SupplyItem }) => (
    <View
      className={`flex-row items-center justify-between p-4 ${styles.cardBackground} mb-2 rounded-lg shadow-sm`}
    >
      <Text className={`text-base ${styles.textPrimary} flex-1`}>
        {item.name}
      </Text>
      <Text className={`text-sm ${styles.textSecondary} flex-1 text-center`}>
        {item.qty}
      </Text>
      <Text className={`text-sm ${styles.textSecondary} flex-1 text-center`}>
        {item.status}
      </Text>
    </View>
  );

  // Render table header
  const renderHeader = () => (
    <View
      className={`flex-row ${styles.headerBackground} p-4 rounded-lg mb-2 shadow-sm`}
    >
      <Text className={`text-base ${styles.textPrimary} flex-1 font-semibold`}>
        Name
      </Text>
      <Text
        className={`text-base ${styles.textPrimary} flex-1 text-center font-semibold`}
      >
        Quantity
      </Text>
      <Text
        className={`text-base ${styles.textPrimary} flex-1 text-center font-semibold`}
      >
        Status
      </Text>
    </View>
  );

  const materials = materialsData.map((item) => ({
    id: item.id,
    name: item.MatN,
    qty: item.qty,
    status: item.status,
  }));

  const equipment = equipmentData.map((item) => ({
    id: item.id,
    name: item.EqpmntN,
    qty: item.qty,
    status: item.status,
  }));

  return (
    <SafeAreaView className={`flex-1 ${styles.background} p-4`}>
      <Text className={`text-3xl font-extrabold mb-5 ${styles.textPrimary}`}>
        Supplies
      </Text>
      <Text className={`text-xl font-semibold ${styles.textPrimary} mb-4`}>
        Materials
      </Text>
      <FlatList
        data={materials}
        keyExtractor={(item) => `material-${item.id}`}
        renderItem={supplies}
        ListHeaderComponent={renderHeader}
        className="mb-6"
      />

      <Text className={`text-xl font-semibold ${styles.textPrimary} mb-4`}>
        Equipment
      </Text>
      <FlatList
        data={equipment}
        keyExtractor={(item) => `equipment-${item.id}`}
        renderItem={supplies}
        ListHeaderComponent={renderHeader}
        className="mb-4"
      />

      <TouchableOpacity
        onPress={openModal}
        className={`flex-row items-center justify-between px-4 py-3 rounded-md ${styles.buttonBackground}`}
      >
        <Text className={`text-md font-semibold ${styles.buttonText}`}>
          Request a supply?
        </Text>
        <Ionicons name="arrow-forward" size={20} color={styles.iconColor} />
      </TouchableOpacity>

      <RequestSupply isVisible={isModalVisible} onClose={closeModal} />
    </SafeAreaView>
  );
};

export default Supply;
