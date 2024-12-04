import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker

export default function AddNewPet() {
  const navigation = useNavigation();

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    category: "Dogs",
    sex: "Male",
  });
  const [gender, setGender] = useState();
  const [image, setImage] = useState();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    GetCategories();
  }, []);

  const GetCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Category"));
      const categories = [];
      snapshot.forEach((doc) => {
        categories.push(doc.data());
      });
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (fn, fv) => {
    setFormData((prev) => ({
      ...prev,
      [fn]: fv,
    }));
  };

  const onSubmit = () => {
    if (Object.keys(formData).length !== 11) {
      ToastAndroid.show("Enter All Details", ToastAndroid.SHORT);
      return;
    }
    SaveFormData(); // Directly call SaveFormData without image upload
  };

  const SaveFormData = async () => {
    const docId = Date.now().toString();
    setLoader(true);
    try {
      await setDoc(doc(db, "Pets", docId), {
        ...formData,
        imageUrl: "", // Leave the image URL blank since you're not using Firebase Storage
        username: "Amreth",
        email: "amreth73@gmail.com",
        id: docId,
        userImage: "", // Leave the userImage blank as well
      });
      ToastAndroid.show("Pet added successfully!", ToastAndroid.SHORT);
      setLoader(false);
      navigation.goBack(); // Navigate back after successful submission
    } catch (error) {
      console.error("Error saving form data: ", error);
      setLoader(false);
    }
    router.replace("/(tabs)/home");
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Add New Pet for Adoption
      </Text>
      <Pressable onPress={imagePicker}>
        {!image ? (
          <Image
            source={require("../../assets/images/foot.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.GRAY,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </Pressable>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Owner Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => handleInputChange("userName", val)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number *</Text>
        <TextInput
          keyboardType="numeric"
          maxLength={10}
          style={styles.input}
          onChangeText={(val) => handleInputChange("mobile", val)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => handleInputChange("email", val)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => handleInputChange("name", val)}
        />
      </View>
      <View>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.input}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
        >
          {categoryList.map((cat, ind) => (
            <Picker.Item key={ind} label={cat.name} value={cat.name} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => handleInputChange("breed", val)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(val) => handleInputChange("age", val)}
        />
      </View>
      <View>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue) => {
            setGender(itemValue);
            handleInputChange("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(val) => handleInputChange("weight", val)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => handleInputChange("address", val)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          numberOfLines={5}
          multiline={true}
          style={styles.input}
          onChangeText={(val) => handleInputChange("about", val)}
        />
      </View>

      <TouchableOpacity style={styles.btn} disabled={loader} onPress={onSubmit}>
        {loader ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text
            style={{
              fontFamily: "outfit-medium",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Submit
          </Text>
        )}
      </TouchableOpacity>
      <View style={{ marginBottom: 70 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
  },
  label: {
    marginVertical: 5,
    fontFamily: "outfit",
  },
  btn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 50,
  },
});
