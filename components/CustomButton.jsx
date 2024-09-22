import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center 
        ${containerStyles} ${isLoading ? 'opacity-60' : ''}`}
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
