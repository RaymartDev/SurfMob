import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    android: {
                        position: 'absolute',
                    },
                    ios: {
                        position:'absolute',
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="simulation"
                options={{
                    title: 'Simulation',
                    tabBarIcon: ({ color }) => <MaterialIcons name="arrow-right" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="control"
                options={{
                    title: 'Control',
                    tabBarIcon: ({ color }) => <MaterialIcons name="control-camera" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        width: '80%',
    }
});
