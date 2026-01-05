import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button, Image, Text, View } from "react-native";
import QRCodeLocalImage from "react-native-qrcode-local-image";

export default function GalleryScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);
  const [isQRCode, setIsQRCode] = useState(false);

  const pickImage = async () => {
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
      QRCodeLocalImage.decode(imageUri, (error: any, result: string) => {
        if (error) {
          setIsQRCode(false);
          console.log("Not a QR code or scan failed", error);
        } else {
          setQrData(result);
          setIsQRCode(true);
          console.log("QR Code Data:", result);
        }
      });
    } catch (error) {
      setIsQRCode(false);
      console.log("Not a QR code or scan failed", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Open Gallery" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}
      {isQRCode && <Text style={{ marginTop: 20 }}>QR Data: {qrData}</Text>}
    </View>
  );
}
