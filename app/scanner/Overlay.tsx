import { Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

const innerDimension = 300;

export const Overlay = () => {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      {/* Top */}
      <View style={[styles.overlay, { height: (height - innerDimension) / 2 }]} />
      
      {/* Middle row with left, center (transparent), and right */}
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.overlay, { width: (width - innerDimension) / 2, height: innerDimension }]} />
        <View style={{ width: innerDimension, height: innerDimension, borderWidth: 3, borderColor: 'white', borderRadius: 20 }} />
        <View style={[styles.overlay, { width: (width - innerDimension) / 2, height: innerDimension }]} />
      </View>
      
      {/* Bottom */}
      <View style={[styles.overlay, { height: (height - innerDimension) / 2 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
