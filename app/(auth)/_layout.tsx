import { View, Text } from 'react-native'
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="log-in"
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="forgot-pass"
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="change-pass"
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="verify2fa"
          options={{ headerShown: false }}
        />
      </Stack>

      <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default AuthLayout