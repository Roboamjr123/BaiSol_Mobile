import { View, Text, TextInput, Button, Modal } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import FormField from "./FormField";

interface RequestSupplyProps {
  isVisible: boolean;
  onClose: () => void;
}

const RequestSupply: React.FC<RequestSupplyProps> = ({
  isVisible,
  onClose,
}) => {
  const [form, setForm] = useState({ supplyName: "", quantity: "" });

  const handleSubmit = () => {
    if (form.supplyName && form.quantity) {
      Toast.show({
        text1: "Requested Successfully",
        text2: "Request of " + form.quantity + " " + form.supplyName,
        type: "success",
        position: "top",
      });

      setForm({supplyName: "", quantity: ""})
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

          <FormField
            title="Supply Name"
            value={form.supplyName}
            handleChangeText={(e) => setForm({ ...form, supplyName: e })}
            placeholder="ex.: Grinder"
            otherStyles="mb-4"
          />

          <FormField
            title="Quantity"
            value={form.quantity}
            handleChangeText={(e) => setForm({ ...form, quantity: e })}
            placeholder="How many?"
            otherStyles="mb-6"
          />

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
