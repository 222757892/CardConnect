import { StatusBar } from "expo-status-bar";
import { TextInput as PaperInput } from "react-native-paper";
import { Text as PaperText } from "react-native-paper";
import { AppButton } from "../components/MobileButton.js";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function CreatePassword({ navigation, route }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { userId } = route.params || {};

  const handleCreatePassword = async () => {
    console.log("Button pressed!");
    setLoading(true);
    console.log("Loading set to true");

    setError(null);

    if (!password || !confirmPassword) {
      setError("Both fields are required");
      setLoading(false);
      console.log("Error: Both fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      console.log("Error: Passwords do not match");
      return;
    }

    if (!userId) {
      setError("Missing user ID");
      setLoading(false);
      console.log("Error: Missing user ID");
      return;
    }

    try {
      console.log("Calling API...");
      const response = await fetch(
        "http://172.20.10.8:9091/api/user-accounts/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            password: password,
            confirmPassword: confirmPassword,
          }),
        }
      );

      const textResponse = await response.text();
      let data;

      try {
        data = JSON.parse(textResponse);
      } catch {
        data = textResponse;
      }

      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (!response.ok) {
        setError(
          typeof data === "string"
            ? data
            : data?.message || JSON.stringify(data) || "Failed to set password"
        );
        setLoading(false);
        console.log("API Error:", error);
        return;
      }

      setLoading(false);
      console.log("Password created successfully");
      Alert.alert("Success", "Password created successfully!", [
        {
          text: "Login",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (err) {
      setLoading(false);
      setError("Network error: " + err.message);
      console.log("Network error:", err.message);
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
      <View style={styles.centerContent}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoImage}
          />
          <PaperText variant="headlineLarge" style={styles.titleText}>
            Create Your Password
          </PaperText>
          <PaperText style={styles.subText}>
            For Secure Access to Your CPUT Card
          </PaperText>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <PaperInput
            label="Password"
            placeholder="Enter your password"
            mode="outlined"
            style={styles.inputText}
            secureTextEntry={secureText}
            onChangeText={setPassword}
            value={password}
            right={
              <PaperInput.Icon
                icon={secureText ? "eye-off" : "eye"}
                onPress={() => setSecureText(!secureText)}
              />
            }
            theme={{ colors: { primary: "#145DA0" } }}
            selectionColor="orange"
            cursorColor="orange"
          />

          <PaperInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            mode="outlined"
            style={styles.inputText}
            secureTextEntry={secureText}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            theme={{ colors: { primary: "#145DA0" } }}
            selectionColor="orange"
            cursorColor="orange"
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonContainer}>
            <AppButton
              onPress={handleCreatePassword}
              disabled={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Submitting..." : "Create Password"}
            </AppButton>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 2,
    padding: 5,
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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

  titleText: {
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
    alignItems: "center",
  },

  inputText: {
    fontSize: 16,
    backgroundColor: "#fff",
    width: "100%",
  },

  errorText: {
    color: "red",
    textAlign: "center",
  },

  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
});
