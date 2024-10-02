import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";

interface FormFieldProps extends TextInputProps {
  // Extend TextInputProps
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles = "",
  ...props // Spread other props to TextInput
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-pmedium">{title}</Text>

      <View className="border-2 border-gray-100 w-full h-16 px-4 bg-white rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-black-100 font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props} // Spread other props like keyboardType
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
