import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'

const LogIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {

  }

  const showAlert = () => {
    Alert.alert(
      "Page Not Found",
      "This module is not available.",
      [{ text: "OKAY" }],
      { cancelable: true }
    );
  };
  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[180px] h-[90px]"
          />

          <Text className="text-2xl text-white text-semibold mt-6 font-psemibold">Login to BaiSol</Text>

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
          />

          <CustomButton 
            title='Login'
            handlePress={()=> router.push('/(tabs)/home')}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-1">
            <Text className="text-sm text-gray-100 font-pregular">Don't have an account?</Text>
            <TouchableOpacity onPress={showAlert}>
              <Text className="text-sm font-psemibold text-secondary">Request</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LogIn