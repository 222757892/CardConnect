import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text as PaperText } from "react-native-paper";
import { useState } from "react";
import ConsentCheckboxes from "../components/Checkbox.js";
import { AppButton } from "../components/MobileButton.js";
import AppTextInput from "../components/TextInput.js";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SignUp({ navigation }) {
  const [idNumber, setIdNumber] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const agreedToTerms = consentChecked && privacyChecked;

  const handleVerify = async () => {
    if (!studentNumber || !idNumber) {
      Alert.alert("Missing Info", "Please fill in all fields.");
      return;
    }

    if (!agreedToTerms) {
      Alert.alert(
        "Consent Required",
        "Please accept terms and privacy policy."
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.101.105:9091/api/user-accounts/verify-student",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentNumber,
            identificationNumber: idNumber,
            agreedToTerms,
          }),
        }
      );

      const textResponse = await response.text();

      if (!response.ok) {
        const isAccountExists =
          textResponse.includes("already have an account") ||
          textResponse.toLowerCase().includes("please log in");

        Alert.alert("Verification Failed", textResponse, [
          {
            text: "OK",
            onPress: () => {
              if (isAccountExists) navigation.navigate("Login");
            },
          },
        ]);

        setLoading(false);
        return;
      }

      const userId = textResponse.replace(/"/g, "");
      Alert.alert("Verified", "Student verified successfully.", [
        {
          text: "Next",
          onPress: () =>
            navigation.navigate("CreatePassword", { userId: userId }),
        },
      ]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert("Network Error", err.message || "Something went wrong.");
    }
  };

  return (
    <LinearGradient colors={["#145DA0", "#0C2D48"]} style={styles.container}>
      <StatusBar style="light" />

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Centered Content */}
      <KeyboardAvoidingView
        style={styles.centerContent}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoImage}
          />
          <PaperText variant="headlineLarge" style={styles.title}>
            Sign up for your CPUT Card Account
          </PaperText>
          <PaperText style={styles.subText}>Secure Access Portal</PaperText>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <AppTextInput
            label="Student number"
            placeholder="Enter your student number"
            value={studentNumber}
            onChangeText={setStudentNumber}
            style={styles.inputText}
          />
          <AppTextInput
            label="ID/Passport Number"
            placeholder="Enter your SA ID or passport no."
            value={idNumber}
            onChangeText={setIdNumber}
            isPassword={false}
            style={styles.inputText}
          />

          <ConsentCheckboxes
            consentChecked={consentChecked}
            setConsentChecked={setConsentChecked}
            privacyChecked={privacyChecked}
            setPrivacyChecked={setPrivacyChecked}
          />

          {/* Button */}
          <View style={styles.buttonContainer}>
            <AppButton onPress={handleVerify} disabled={loading}>
              {loading ? "Verifying..." : "Verify me as a CPUT student"}
            </AppButton>
          </View>

          {/* Already verified? */}
          <PaperText style={styles.clickHere}>
            Already a verified student?{" "}
            <PaperText
              style={styles.clickHereBold}
              onPress={() => navigation.navigate("Login")}
            >
              LOGIN
            </PaperText>
          </PaperText>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 2,
    padding: 5,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  logoImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 15,
    borderRadius: 20,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },

  title: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "700",
    paddingBottom: 30,
    fontSize: 27,
  },

  subText: {
    color: "#e0e0e0",
    fontSize: 14,
    marginTop: 5,
  },

  card: {
    width: "100%",
    backgroundColor: "#ffffffee",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    gap: 20,
    // alignItems: "flex-start",
  },

  inputText: {
    width: "100%",
    backgroundColor: "#fff",
  },

  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },

  clickHere: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
  },

  clickHereBold: {
    fontWeight: "bold",
    color: "#145DA0",
  },
});
