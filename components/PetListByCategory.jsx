import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore"; // Ensure `where` is imported
import PetListItem from "./PetListItem";
import { db } from "../config/FirebaseConfig"; // Replace with your Firebase config path

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetPetList("Dogs");
  }, []);

  const GetPetList = async (category) => {
    setLoader(true);
    setPetList([]);

    try {
      const q = query(
        collection(db, "Pets"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      const petsArray = querySnapshot.docs.map((doc) => doc.data()); // Map data into an array

      setPetList(petsArray); // Set the pet list in one go
    } catch (error) {
      console.error("Error fetching pet data:", error);
    }

    setLoader(false);
  };

  return (
    <View>
      <Category category={(val) => GetPetList(val)} />
      <FlatList
        style={{ marginTop: 10 }}
        horizontal={true}
        refreshing={loader}
        onRefresh={() => GetPetList("Dogs")}
        data={petList}
        renderItem={({ item }) => <PetListItem pet={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
