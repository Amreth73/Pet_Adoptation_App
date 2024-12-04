import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Shared from "../Sharead/Shared";
import { useUser } from "@clerk/clerk-expo";

export default function MarkFav({ pet, color = "black" }) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (user) {
      GetFav();
    }
  }, [user]);

  const GetFav = async () => {
    try {
      const result = await Shared.GetFavList(user);
      setFavList(result?.favorites ?? []); // Ensure favList is always an array
    } catch (error) {
      console.error("Error fetching favorites: ", error);
      setFavList([]); // Set an empty array if fetching fails
    }
  };

  const AddToFav = async () => {
    try {
      const updatedFavList = Array.isArray(favList)
        ? [...favList, pet.id]
        : [pet.id]; // Ensure updatedFavList is an array
      await Shared.UpdateFav(user, updatedFavList);
      setFavList(updatedFavList);
    } catch (error) {
      console.error("Error adding to favorites: ", error);
    }
  };

  const removeFromFav = async () => {
    try {
      const updatedFavList = Array.isArray(favList)
        ? favList.filter((item) => item !== pet.id)
        : []; // Ensure updatedFavList is an array
      await Shared.UpdateFav(user, updatedFavList);
      setFavList(updatedFavList);
    } catch (error) {
      console.error("Error removing from favorites: ", error);
    }
  };

  return (
    <View>
      {Array.isArray(favList) && favList.includes(pet.id) ? (
        <Pressable onPress={removeFromFav}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={AddToFav}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
}
