import { Tabs } from "expo-router"
import { StyleSheet } from "react-native"
import { HapticTab } from "../../components/HapticTab"
import { useColorScheme } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: "#0056a6", // Blue color for active tab
        tabBarInactiveTintColor: "#333",
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#f8f3f0", // Light beige/cream color
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          ...styles.shadow,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="control"
        options={{
          title: "Control",
          tabBarIcon: ({ color }) => <Ionicons name="game-controller-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
})

