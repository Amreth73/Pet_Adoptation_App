import { View, Text, Image, Pressable, StyleSheet, Alert } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function OwnerInfo({ pet }) {
  const router = useRouter();

  const openWhatsApp = () => {
    const phoneNumber = pet?.mobile;
    if (phoneNumber) {
      const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
      Linking.canOpenURL(whatsappUrl)
        .then((supported) => {
          if (supported) {
            Linking.openURL(whatsappUrl);
          } else {
            Alert.alert("WhatsApp is not installed on your device");
          }
        })
        .catch((err) => console.error("Error opening WhatsApp", err));
    }
  };

  const openEmail = () => {
    const email = pet?.email;
    if (email) {
      const emailUrl = `mailto:${email}`;
      Linking.canOpenURL(emailUrl)
        .then((supported) => {
          if (supported) {
            Linking.openURL(emailUrl);
          } else {
            Alert.alert("No email app available");
          }
        })
        .catch((err) => console.error("Error opening email client", err));
    }
  };

  return (
    <View>
      <View style={styles.common}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Image
            source={{ uri: pet?.userImage }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 99,
            }}
          />
          <View>
            <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
              {pet?.userName}
            </Text>
            <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
              Pet Owner
            </Text>
          </View>
        </View>

        <Ionicons name="person-circle" size={30} color={Colors.PRIMARY} />
      </View>

      <View style={styles.common}>
        <View>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 17,
              marginLeft: 57,
            }}
          >
            {pet?.mobile}
          </Text>
          <Text
            style={{ fontFamily: "outfit", color: Colors.GRAY, marginLeft: 57 }}
          >
            Phone Number
          </Text>
        </View>
        <Pressable onPress={openWhatsApp}>
          <Ionicons name="logo-whatsapp" size={24} color={Colors.PRIMARY} />
        </Pressable>
      </View>

      <View style={styles.common}>
        <View>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 17,
              marginLeft: 57,
            }}
          >
            {pet?.email}
          </Text>
          <Text
            style={{ fontFamily: "outfit", color: Colors.GRAY, marginLeft: 57 }}
          >
            Email
          </Text>
        </View>
        <Pressable onPress={openEmail}>
          <Ionicons name="mail" size={24} color={Colors.PRIMARY} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  common: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    padding: 20,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
