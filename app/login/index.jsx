import { View, Text, Image, Pressable } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useOAuth, useUser, useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";

// Hook to warm up WebBrowser on app start
export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const clerk = useClerk();
  const { isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  // Effect to log user details and sign-in status
  useEffect(() => {
    console.log("User sign-in status:", isSignedIn);
    console.log("User details:", user);
  }, [isSignedIn, user]);

  // Handler to fetch updated user details
  const fetchUserDetails = async () => {
    if (isSignedIn) {
      await clerk.loadUser(); // Refreshes the user object
      console.log("User refreshed:", user);
    }
  };

  // onPress handler for Google OAuth
  const onPress = useCallback(async () => {
    setIsLoading(true);
    try {
      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(tabs)/home", { scheme: "myapp" }),
      });
      if (createdSessionId) {
        await clerk.setActive({ session: createdSessionId });
        await fetchUserDetails(); // Update user after session activation
      }
    } catch (err) {
      console.error("OAuth Error", err);
    } finally {
      setIsLoading(false);
    }
  }, [startOAuthFlow, clerk]);

  return (
    <View style={{ backgroundColor: Colors.WHITE, height: "100%" }}>
      <Image
        source={require("../../assets/images/login.png")}
        style={{ width: "100%", height: 500 }}
      />
      <View style={{ padding: 20, display: "flex", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Ready to make a new friend?
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
            textAlign: "center",
            color: Colors.GRAY,
          }}
        >
          Let's adopt the pet which you like and make their life happy again
        </Text>
        <Pressable
          onPress={onPress}
          style={{
            padding: 14,
            marginTop: 100,
            backgroundColor: isLoading ? Colors.GRAY : Colors.PRIMARY,
            width: "100%",
            borderRadius: 14,
          }}
          disabled={isLoading}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {isLoading ? "Loading..." : "Get Started"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
