import { decode as atob } from "base-64";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import jpeg from "jpeg-js";
import jsQR from "jsqr";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, Text, View } from "react-native";

export default function GalleryScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);
  const [isQRCode, setIsQRCode] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [openedOnce, setOpenedOnce] = useState(false);

  useEffect(() => {
    if (!openedOnce) {
      setOpenedOnce(true);
      pickImage();
    }
  }, [openedOnce]);

  const pickImage = async () => {
    // Request permissions first
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to access your gallery!');
      router.back();
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      await scanQRCode(uri);
    }
  };

  const scanQRCode = async (imageUri: string) => {
    try {
      setIsScanning(true);
      console.log("🔍 Scanning QR code from:", imageUri);

      const attempts = [
        { label: "full-0deg", actions: [] as ImageManipulator.Action[] },
        { label: "1200w-0deg", actions: [{ resize: { width: 1200 } }] },
        { label: "800w-0deg", actions: [{ resize: { width: 800 } }] },
        { label: "800w-90deg", actions: [{ resize: { width: 800 } }, { rotate: 90 }] },
        { label: "800w-180deg", actions: [{ resize: { width: 800 } }, { rotate: 180 }] },
        { label: "800w-270deg", actions: [{ resize: { width: 800 } }, { rotate: 270 }] },
      ];

      for (const attempt of attempts) {
        console.log(`🔄 Attempt ${attempt.label}`);

        const manipulated = await ImageManipulator.manipulateAsync(
          imageUri,
          attempt.actions,
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
        );

        if (!manipulated.base64) {
          console.log("⚠️ No base64 in attempt", attempt.label);
          continue;
        }

        // Base64 -> binary
        const binaryString = atob(manipulated.base64);
        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          byteArray[i] = binaryString.charCodeAt(i);
        }

        // Decode JPEG to RGBA buffer
        const decoded = jpeg.decode(byteArray, { useTArray: true });
        if (!decoded || !decoded.data) {
          console.log("⚠️ Failed to decode JPEG in attempt", attempt.label);
          continue;
        }

        const { data, width, height } = decoded;
        const imageData = new Uint8ClampedArray(data); // copy to clamped array
        console.log("📸 Image dimensions:", width, "x", height, "label:", attempt.label);

        const qrCode = jsQR(imageData, width, height);
        if (qrCode) {
          setQrData(qrCode.data);
          setIsQRCode(true);
          console.log("✅ QR Code Found:", qrCode.data, "via", attempt.label);
          // Navigate back to home with QR data
          setTimeout(() => {
            router.push({
              pathname: "/",
              params: { qrLink: qrCode.data }
            });
          }, 500);
          return;
        }
      }

      setIsQRCode(false);
      console.log("❌ No QR code detected in any attempt");
      setIsScanning(false);
    } catch (error) {
      setIsQRCode(false);
      console.log("❌ QR Scan Error:", error);
      setIsScanning(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isScanning ? (
        <View style={{ alignItems: "center", gap: 16 }}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#0f172a" }}>Scanning QR Code...</Text>
        </View>
      ) : (
        <>
          <Button title="Open Gallery" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, marginTop: 20 }}
            />
          )}
          {isQRCode && <Text style={{ marginTop: 20 }}>QR Data: {qrData}</Text>}
        </>
      )}
    </View>
  );
}
