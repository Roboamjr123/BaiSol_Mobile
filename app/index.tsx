import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Image,
  Text,
  View,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native"; // Import the necessary types
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { Colors } from "@/constants/Colors";

export default function App() {
  const cardImages = [images.card1, images.card2, images.card3, images.card4, images.card5];
  const [activeIndex, setActiveIndex] = useState(0); // To track the active card index
  const scaleAnimation = useRef(new Animated.Value(1)).current; // Animation value

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x; // Get current scroll position
    const index = Math.floor(contentOffsetX / 280); // Calculate the index based on card width
    setActiveIndex(index); // Update the active index
  };

  // Scale animation effect
  const animateCardScale = (index: number) => {
    return activeIndex === index
      ? scaleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.15], // Scale the card up to 1.1
        })
      : 1; // Keep it normal for others
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[93vh] px-0">
          <View className="flex-row items-center py-7">
            <Image
              source={images.logoSmall}
              className="w-[60px] h-[80px]"
              resizeMode="contain"
            />
            <Text className="text-3xl font-black text-secondary-200"> BAiSOL </Text>
          </View>

          {/* Horizontal Scrollable Card Carousel */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingVertical: 25,
            }}
            onScroll={handleScroll} // Trigger the handleScroll function
            scrollEventThrottle={16} // Controls how often the scroll events are fired
          >
            {cardImages.map((card, index) => (
              <Animated.View
                key={index}
                style={{
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 8,
                  overflow: "hidden",
                  width: 280,
                  height: 250,
                  marginRight: 13,
                  marginLeft: 14,
                  transform: [{ scale: animateCardScale(index) }], // Apply scaling effect
                }}
              >
                <Image
                  source={card}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </Animated.View>
            ))}
          </ScrollView>

          <View className="w-full px-3">
            <View className="relative">
              <Text className="text-2xl text-black font-bold text-center">
                Ease Installation and Effortless Monitoring with
                <Text className="text-secondary-300"> BaiSol </Text>
              </Text>
              <Image
                source={images.path}
                className="w-[120px] h-[15px] absolute -bottom-3 right-5"
                resizeMode="contain"
              />
            </View>

            <Text className="text-sm font-pregular text-gray-500 mt-7 text-center">
              An optimized allocation resource system exclusively for SunVoltage
              Inc.
            </Text>

            <CustomButton
              title="Continue to Login"
              handlePress={() => router.push("/log-in")}
              containerStyles="w-full mt-7"
              textStyles="text-white"
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
