import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Colors from "../../constants/Colors";

export default function Category({ category }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    const categories = [];
    snapshot.forEach((doc) => {
      console.log(doc.data());
      categories.push(doc.data());
    });
    setCategoryList(categories); // Set all categories at once
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Category
      </Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name);
              category(item.name);
            }}
            style={{ flex: 1, alignItems: "center", marginBottom: 10 }}
          >
            <View
              style={[
                styles.container,
                selectedCategory === item.name && styles.selectedCategory,
              ]}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={{ textAlign: "center", fontFamily: "outfit" }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },
  selectedCategory: {
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.SECONDARY,
  },
});
