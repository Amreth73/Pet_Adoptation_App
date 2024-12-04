import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        headerShown: false,
        // tabBarActiveBackgroundColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          headershown: false,
          tabBarIcon: ({ color }) => {
            <Ionicons name="home" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="Favorite"
        options={{
          title: "Favorite",
          headershown: false,
          tabBarIcon: ({ color }) => {
            <Ionicons name="heart" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          headershown: false,
          tabBarIcon: ({ color }) => {
            <Ionicons name="chatbubble" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headershown: false,
          tabBarIcon: ({ color }) => {
            <Ionicons name="people-circle" size={24} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
