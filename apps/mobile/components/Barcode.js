import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function StudentBarcode({ value }) {
  return (
    <View style={styles.barcodeImageContainer}>
      <Image
        source={require("../assets/barcode.png")}
        style={styles.barcodeImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  barcodeImageContainer: {
    marginTop: 2,
    alignItems: "center",
  },
  barcodeImage: {
    width: 350,
    height: 120,
  },
});
