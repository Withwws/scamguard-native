declare module "react-native-qrcode-local-image" {
  const QRCodeLocalImage: {
    decode: (
      path: string,
      callback: (error: Error | null, result: string) => void
    ) => void;
  };
  export default QRCodeLocalImage;
}
