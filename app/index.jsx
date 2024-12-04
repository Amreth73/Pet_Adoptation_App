import { Link, Redirect, useRootNavigationState } from "expo-router";
import { Text, View, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
export default function Index() {
  const { user } = useUser();

  // const rootNavigationStatus = useRootNavigationState();
  // useEffect(() => {
  //   CheckNavLoaded();
  // }, []);
  // const CheckNavLoaded = () => {
  //   if (!rootNavigationStatus.key) return null;
  // };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user ? <Redirect href={"/(tabs)/home"} /> : <Redirect href={"/login"} />}
      {/* <Link href={"/login"}>
        <Text>Go To Login Screen</Text>
      </Link> */}
    </View>
  );
}
