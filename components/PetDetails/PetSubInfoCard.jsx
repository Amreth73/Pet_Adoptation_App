import React from "react";
import { View, Text, Image } from "react-native";
import Colors from "../../constants/Colors";
import { useFonts } from "expo-font";

export default function PetSubInfoCard({ icon, title, value }) {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    outfit: require("../../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../../assets/fonts/Outfit-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Return a loading indicator or null while fonts load
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        padding: 10,
        margin: 5,
        borderRadius: 8,
        flex: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Image
        source={icon}
        style={{
          width: 40,
          height: 40,
          marginRight: 10, // Adjust margin for spacing
        }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.GRAY,
            fontFamily: "outfit", // Outfit regular font if loaded
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: Colors.BLACK, // Explicit color for better contrast
            fontFamily: "outfit-medium", // Outfit medium font if loaded
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}
