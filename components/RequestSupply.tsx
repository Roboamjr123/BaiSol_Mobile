import { View, Text, Button, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker"; // Import Picker

interface RequestSupplyProps {
  isVisible: boolean;
  onClose: () => void;
}

// Mock sample data for equipment (assigned equipment)
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

const RequestSupply: React.FC<RequestSupplyProps> = ({
  isVisible,
  onClose,
}) => {
  const [form, setForm] = useState({ supplyName: "", quantity: "" });

  // Combine equipment details to populate the supply options in the dropdown
  const equipmentOptions = mockAssignedEquipment.flatMap((category) =>
    category.details.map((item) => ({
      label: `${item.eqptDescript} (${item.eqptCode})`,
      value: item.eqptCode,
    }))
  );

  const handleSubmit = () => {
    if (form.supplyName && form.quantity) {
      Toast.show({
        text1: "Requested Successfully",
        text2: `Request for ${form.quantity} of ${form.supplyName}`,
        type: "success",
        position: "top",
      });

      setForm({ supplyName: "", quantity: "" });
      onClose();
    } else {
      alert("Please fill in both fields!");
    }
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      transparent={true}
      animationType="slide"
    >
      <SafeAreaView className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-5 rounded-lg w-4/5 max-w-md">
          <Text className="text-xl font-bold mb-4 text-center">
            Request a Supply
          </Text>

          {/* Supply Name Dropdown */}
          <Text className="text-sm font-semibold mb-2">Supply Name</Text>
          <Picker
            selectedValue={form.supplyName}
            onValueChange={(itemValue) =>
              setForm({ ...form, supplyName: itemValue })
            }
            style={{ height: 50, width: "100%" }}
          >
            <Picker.Item label="Select Equipment" value="" />
            {equipmentOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>

          {/* Quantity Input */}
          <Text className="text-sm font-semibold mb-2 mt-4">Quantity</Text>
          <TextInput
            value={form.quantity}
            onChangeText={(text) => setForm({ ...form, quantity: text })}
            placeholder="How many?"
            keyboardType="numeric"
            className="border border-gray-300 p-2 rounded-lg mb-6"
          />

          {/* Buttons */}
          <View className="flex-row justify-end">
            <View className="mr-2">
              <Button title="Submit" onPress={handleSubmit} />
            </View>
            <View>
              <Button title="Cancel" onPress={onClose} color="red" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default RequestSupply;
