import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import { useRouter, useNavigationContainerRef } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();
  const [isReady, setIsReady] = useState(false);

  const BackgroundImage = require("./(tabs)/images/boat.png")
  useEffect(() => {
    // Wait until the navigation is ready before navigating
    const checkReady = setInterval(() => {
      if (navigationRef.isReady()) {
        setIsReady(true);
        clearInterval(checkReady);
      }
    }, 500);

    return () => clearInterval(checkReady);
  }, []);

  useEffect(() => {
    if (isReady) {
      setTimeout(() => {
        router.replace("/(tabs)");
      }, 6000);
    }
  }, [isReady]);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImageContainer}>
          <Image 
              source={BackgroundImage} 
              style={styles.image}
              />
      </View>
      <View style={styles.bottomBackground}>
        <Text style={styles.title}>Welcome To S.U.R.F</Text>
        <Text style={styles.caption}>Your AI Rescue{"\n"}Companion is Here</Text>
        <ActivityIndicator size="large" color="white" />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0077c2",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "white",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
  },
  backgroundImageContainer: {
    width: "100%",
    height: "65%"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  caption: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
  },
  bottomBackground: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
    borderTopStartRadius: 100,
    borderTopEndRadius: 100,
    backgroundColor: "#0077c2",
  }
});