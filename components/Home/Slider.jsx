import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, "Sliders"));
    const sliders = snapshot.docs.map((doc) => doc.data());
    setSliderList(sliders);
  };

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={sliderList}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item?.imageUrl }} style={style.sliderImage} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const style = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: 170,
    borderRadius: 15,
    marginRight: 15,
  },
});
