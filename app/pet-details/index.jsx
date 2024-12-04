import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import {
  router,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import Colors from "../../constants/Colors";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);
  const InitiateChat = async () => {
    const docId1 = user?.primaryEmailAddress?.emailAddress + "_" + pet?.email;
    const docId2 = pet?.email + "_" + user?.primaryEmailAddress?.emailAddress;

    const q = query(
      collection(db, "Chat"),
      where("id", "in", [docId1, docId2])
    );
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      console.log(doc.data);

      router.push({
        pathname: "/chat",
        params: { Id: docId1 },
      });
    });

    if (querySnapShot.docs?.length == 0)
      await setDoc(doc(db, "Chat", docId1), {
        id: docId1,
        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName,
          },
          {
            email: pet?.email,
            imageUrl: pet?.userImage,
            name: pet?.userName,
          },
        ],
      });
    router.push({
      pathname: "/chat",
      params: { Id: docId1 },
    });
  };

  return (
    <View>
      <ScrollView>
        {/* pet info */}
        <PetInfo pet={pet} />

        {/* pet sub info */}
        <PetSubInfo pet={pet} />
        {/* about */}
        <AboutPet pet={pet} />

        {/* owner details */}
        <OwnerInfo pet={pet} />
        <View
          style={{
            height: 70,
          }}
        ></View>
      </ScrollView>

      {/* adopt me btn */}
      {/* <View style={styles.bottomContanier}>
        <TouchableOpacity style={styles.adoptBtn} onPress={InitiateChat}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              fontSize: 20,
            }}
          >
            Adopt Me
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  adoptBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
  },
  bottomContanier: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});
