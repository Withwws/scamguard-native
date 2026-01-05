import { useCameraPermissions } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from "react-native";

export default function QRscan() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    checkAndRequestPermission();
  }, []);

  const checkAndRequestPermission = async () => {
    if (permission?.granted) {
      router.replace('/scanner');
      return;
    }

    const result = await requestPermission();
    
    if (result.granted) {
      router.replace('/scanner');
    } else {
      alert('Camera permission is required to scan QR codes!');
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Scanner", headerShown: false }} />
      <ActivityIndicator size="large" color="#0E7AFE" />
      <Text style={styles.text}>Requesting Camera Permission...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontSize: 16,
    marginTop: 16,
  },
});
