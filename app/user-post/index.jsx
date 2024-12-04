import { View, Text, FlatList, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { collection, deleteDoc, getDocs, query } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import PetListItem from "../../components/PetListItem";
import Colors from "../../constants/Colors";
export default function UserPost() {
  const { user } = useUser();
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const [userPostList, setUserPostList] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User Post",
    });
    user && GetUserPost();
  }, []);
  const GetUserPost = async () => {
    setLoader(true);
    setUserPostList([]);
    const q = query(
      collection(db, "Pets"),
      where("email", "==", "arjun45@gmail.com")
    );
    const qs = await getDocs(q);
    qs.forEach((doc) => {
      console.log("last   " + doc.data());
      setUserPostList((prev) => {
        [...prev, doc.data()];
      });
    });
    setLoader(false);
  };
  const onDelete = (docId) => {
    Alert.alert("Do you want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Click"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deletePost(docId),
      },
    ]);
  };

  const deletePost = async (docId) => {
    await deleteDoc(doc(db, "Pets", docId));
    GetUserPost();
  };
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 30,
        }}
      >
        UserPost
      </Text>
      <FlatList
        data={{ userPostList }}
        numColumns={2}
        refreshControl={loader}
        // onRefresh={GetUserPost}
        renderItem={({ item, index }) => {
          <View>
            <PetListItem pet={item} key={index} />
            <Pressable
              onPress={() => onDelete(item?.id)}
              style={{
                backgroundColor: Colors.LIGHT_PRIMARY,
                padding: 5,
                borderRadius: 7,
                marginTop: 5,
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  textAlign: "center",
                }}
              >
                Delete
              </Text>
            </Pressable>
          </View>;
        }}
      />

      {userPostList.length == 0 && <Text>No Post Avaliable Currently...</Text>}
    </View>
  );
}
