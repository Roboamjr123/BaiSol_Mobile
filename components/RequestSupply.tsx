import { View, Text, TextInput, Button, Modal } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface RequestSupplyProps {
  isVisible: boolean;
  onClose: () => void;
}

const RequestSupply: React.FC<RequestSupplyProps> = ({
  isVisible,
  onClose,
}) => {
  const [supplyName, setSupplyName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = () => {
    if (supplyName && quantity) {
      Toast.show({
        text1: "Request Successful",
        text2: "name and qty here",
        type: "success",
        position: "top",
      });

      setSupplyName("");
      setQuantity("");
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

          <TextInput
            className="border border-gray-300 rounded-md mb-3 p-3 text-lg"
            placeholder="Supply Name"
            value={supplyName}
            onChangeText={setSupplyName}
          />

          <TextInput
            className="border border-gray-300 rounded-md mb-4 p-3 text-lg"
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />

          <View className="flex-row justify-between">
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default RequestSupply;
