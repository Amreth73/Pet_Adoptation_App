import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import PetSubInfoCard from "./PetSubInfoCard";

export default function PetSubInfo({ pet }) {
  // Check if the pet object is properly defined
  if (!pet) {
    return <Text>No pet information available</Text>;
  }

  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <PetSubInfoCard
          icon={require("../../assets/images/cal.png")}
          title={"Age"}
          value={(pet.age || "N/A") + " Years"}
        />
        <PetSubInfoCard
          icon={require("../../assets/images/bone.png")}
          title={"Breed"}
          value={pet.breed || "N/A"}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <PetSubInfoCard
          icon={require("../../assets/images/gen.jpg")}
          title={"Sex"}
          value={pet.sex || "N/A"}
        />
        <PetSubInfoCard
          icon={require("../../assets/images/kg.png")}
          title={"Weight"}
          value={(pet.weight || "N/A") + " Kg"}
        />
      </View>
    </View>
  );
}
