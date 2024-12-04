import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import { processColor } from "react-native";
import PetListByCategory from "../../components/PetListByCategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";
export default function Home() {
  return (
    <View
      style={{
        marginTop: 20,
        padding: 20,
      }}
    >
      {/* Header */}
      <Header />
      {/* SLider */}
      <Slider />
      {/* Category */}
      <PetListByCategory />

      {/* List of pets */}

      {/* Add new pet options */}
      <Link href={"/add-new-pet"} style={styles.newpet}>
        <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text
          style={{
            fontFamily: "outfit-medium",
            color: Colors.PRIMARY,
            fontSize: 18,
          }}
        >
          <Text> </Text>Add New Pet
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  newpet: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    borderStyle: "dashed",
    justifyContent: "center",
    textAlign: "center",
  },
});
