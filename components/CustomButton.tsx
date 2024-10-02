import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import React from "react";

// Define the types for props
interface CustomButtonProps {
  title: string;
  handlePress: () => void; // Function type for the button press handler
  containerStyles?: string; // Optional string for additional container styles
  textStyles?: string; // Optional string for additional text styles
  isLoading?: boolean; // Optional boolean to show loading state
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading = false, 
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center 
        ${containerStyles} ${isLoading ? "opacity-80" : ""}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
