import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react'

import { images } from '../constants';
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center min-h-[93vh] px-4">
          <Image 
            source={images.logo}
            className="w-[250px] h-[83px]"
            resizeMode='contain'
          />

          <Image
            source={images.cards}
            className="max-w-[300px] w-full h-[300px]"
            resizeMode='contain'
          />

          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center">
              Ease Installation and Effortless Monitoring with 
              <Text className="text-secondary-200"> BaiSol </Text>
            </Text>
            <Image 
              source={images.path}
              className="w-[120px] h-[15px] absolute -bottom-3 right-4"
              resizeMode='contain'
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Developers: Richard, Roboam, Joshua, Angelie
          </Text>

          <CustomButton 
            title="Continue to Login"
            handlePress={()=> router.push('/log-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}
