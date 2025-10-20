// Swatsi Ratia PrntingCredits
import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../components/ScreenHeader";
import { AppButton } from "../components/MobileButton";
import { CreditsContext } from "../context/CreditsContext";

export default function LoadCreditsScreen() {
  const { credits, addCredits } = useContext(CreditsContext);
  const [amountToLoad, setAmountToLoad] = useState("");

  const handleLoadCredits = () => {
    const amount = parseInt(amountToLoad);
    if (!amount || amount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount to load.");
      return;
    }

    addCredits(amount);
    Alert.alert(
      "Success",
      `Successfully loaded ${amount} credits. New balance: ${credits + amount}`
    );
    setAmountToLoad("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader text="Load Printing Credits" />

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceValue}>{credits} credits</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter amount to load"
        keyboardType="numeric"
        value={amountToLoad}
        onChangeText={setAmountToLoad}
      />

      <AppButton style={styles.loadBtn} onPress={handleLoadCredits}>
        Load Credits
      </AppButton>

      <Text style={styles.note}>
        *In production, this could link to a payment gateway (e.g. PayFast,
        PayPal).
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2F2",
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  balanceCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginBottom: 20,
    alignItems: "center",
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#284B63",
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#145DA0",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  loadBtn: {
    marginBottom: 16,
    borderRadius: 10,
  },
  note: {
    fontSize: 12,
    color: "#888",
    marginTop: 10,
    textAlign: "center",
  },
});