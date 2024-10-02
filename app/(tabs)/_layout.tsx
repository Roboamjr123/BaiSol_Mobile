import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { useColorScheme } from "react-native"; // Import for detecting the theme

// Define the props for the TabIcon component
interface TabIconProps {
  icon: any; // You can specify a more precise type based on your icon assets
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color }}
        className="w-6 h-6"
      />
      <Text
        style={{
          fontFamily: focused ? "Poppins-SemiBold" : "Poppins-Regular",
          color: color,
        }}
        className="text-xs"
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout: React.FC = () => {
  const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)

  const isLightMode = colorScheme === "light"; // Check if the current mode is light

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: isLightMode ? "#FF9C01" : "#FF9C01", // Orange for both modes
          tabBarInactiveTintColor: isLightMode ? "#666666" : "#CDCDE0", // Light gray for light mode, original color for dark mode
          tabBarStyle: {
            backgroundColor: isLightMode ? "#FFFFFF" : "#161622", // White for light mode, dark for dark mode
            borderTopWidth: 1,
            borderTopColor: isLightMode ? "#E0E0E0" : "#232533", // Light gray border for light mode
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="reports"
          options={{
            title: "Reports",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.reports}
                color={color}
                name="Reports"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="supply"
          options={{
            title: "Supply",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.supply}
                color={color}
                name="Supply"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="customers"
          options={{
            title: "Customers",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.customers}
                color={color}
                name="Customers"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
