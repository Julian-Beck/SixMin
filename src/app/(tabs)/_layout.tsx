import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/style/icon-symbol';
import { Colors } from '@/style/theme';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="checklist.checked" color={color} />,
        }}
      />
      <Tabs.Screen
        name="gamble"
        options={{
          title: 'Gamble',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="yieldsign.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
