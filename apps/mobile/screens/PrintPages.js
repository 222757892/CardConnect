// Swatsi Ratia
import React, { useState, useContext } from "react";
import { View, Text, TextInput, Alert, StyleSheet, ScrollView } from "react-native";
import { CreditsContext } from "../context/CreditsContext";
import ScreenHeader from "../components/ScreenHeader";
import { AppButton } from "../components/MobileButton";
import { TouchableOpacity } from "react-native";

export default function PrintPagesScreen() {
  const { credits, deductCredits } = useContext(CreditsContext);
  const [pages, setPages] = useState("");
  const [printer, setPrinter] = useState("Printer 1");
  const [color, setColor] = useState(false);
  const [doubleSided, setDoubleSided] = useState(false);
  const [lamination, setLamination] = useState(false);
  const [cost, setCost] = useState(0);

  const calculateCost = () => {
    let base = parseFloat(pages || 0) * 0.4;
    if (color) base += parseFloat(pages || 0) * 0.3;
    if (doubleSided) base *= 0.9;
    if (lamination) base += parseFloat(pages || 0) * 1.0;
    setCost(base.toFixed(2));
  };

  const handlePrint = () => {
    const totalCost = parseFloat(cost);
    if (credits < totalCost) {
      Alert.alert("Insufficient Credits", "Please load more printing credits.");
      return;
    }
    deductCredits(totalCost);
    Alert.alert(
      "Print Job Sent!",
      `✅ Printer: ${printer}\n🧾 Pages: ${pages}\n🎨 Color: ${color ? "Yes" : "No"}\n📄 Double-sided: ${doubleSided ? "Yes" : "No"}\n✨ Lamination: ${lamination ? "Yes" : "No"}\n💰 Cost: R${totalCost}`
    );
    setPages("");
    setColor(false);
    setDoubleSided(false);
    setLamination(false);
    setCost(0);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 40}}>
      <ScreenHeader text="Print Pages" />
      <Text style={styles.credits}>Available Credits: R{credits.toFixed(2)}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter number of pages"
        keyboardType="numeric"
        value={pages}
        onChangeText={(text) => setPages(text)}
        onBlur={calculateCost}
      />

      <Text style={styles.sectionTitle}>Select Printer:</Text>
      <View style={styles.printerRow}>
        {["Printer 1", "Printer 2"].map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPrinter(p)}
            style={[styles.printerButton, printer === p ? styles.printerButtonActive : styles.printerButtonInactive]}
          >
            <Text style={styles.printerButtonText}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Preferences:</Text>
      {[{ label: "Color", value: color, setter: setColor },
        { label: "Double-sided", value: doubleSided, setter: setDoubleSided },
        { label: "Lamination", value: lamination, setter: setLamination },
      ].map((opt) => (
        <TouchableOpacity
          key={opt.label}
          onPress={() => {
            opt.setter(!opt.value);
            calculateCost();
          }}
          style={[styles.preferenceButton, opt.value ? styles.preferenceActive : styles.preferenceInactive]}
        >
          <Text style={styles.preferenceText}>{opt.label}</Text>
          <Text style={styles.preferenceCheck}>{opt.value ? "✓" : "✗"}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.costContainer}>
        <Text style={styles.costText}>Estimated Cost: R{cost}</Text>
      </View>

      <AppButton onPress={handlePrint} style={styles.printButton}>
        Print
      </AppButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#10405c',
    marginBottom: 16,
    textAlign: 'center',
  },
  credits: {
    fontSize: 16,
    color: '#3C6E71',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#284B63',
  },
  printerRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  printerButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  printerButtonActive: {
    backgroundColor: '#284B63',
  },
  printerButtonInactive: {
    backgroundColor: '#D9E4EC',
  },
  printerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  preferenceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  preferenceActive: {
    backgroundColor: '#E3F2FD',
  },
  preferenceInactive: {
    backgroundColor: '#F4F9F9',
  },
  preferenceText: {
    fontSize: 16,
    color: '#284B63',
    flex: 1,
  },
  preferenceCheck: {
    fontSize: 18,
    color: '#145DA0',
    fontWeight: 'bold',
  },
  costContainer: {
    marginTop: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  costText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#284B63',
  },
  printButton: {
    backgroundColor: '#284B63',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  printButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
