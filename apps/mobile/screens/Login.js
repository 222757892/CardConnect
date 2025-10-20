import { StatusBar } from "expo-status-bar";
import { TextInput as PaperInput, Text as PaperText } from "react-native-paper";
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
import { AppButton } from "../components/MobileButton.js"; // Import your custom button
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://192.168.101.105:9091/api/user-accounts/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: studentNumber,
            password: password,
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

      if (!response.ok) {
        setError(data?.message || data || "Login failed");
        setLoading(false);
        return;
      }

      if (data?.token) {
        // Store token and optionally user info
        console.log("Saving token:", data.token); // <-- Add this
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("email", data.email);
        await AsyncStorage.setItem("userId", data.userId);
        // You can also store name/role/etc. if needed

        console.log("Token stored.");
      }

      setLoading(false);

      Alert.alert("Success", "Login successful!", [
        {
          text: "OK",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "MainDrawer" }],
            });
          },
        },
      ]);
    } catch (err) {
      setLoading(false);
      setError("Network error: " + err.message);
    }
  };

  return (
    <LinearGradient
      colors={["#145DA0", "#0C2D48"]}
      style={styles.loginContainer}
    >
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
          <PaperText variant="headlineLarge" style={styles.loginText}>
            Log in to your CPUT Card Account
          </PaperText>
          <PaperText style={styles.subText}>Secure Access Portal</PaperText>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <PaperInput
            label="Student email"
            placeholder="Enter your student email"
            mode="outlined"
            style={styles.inputText}
            theme={{ colors: { primary: "#145DA0" } }}
            selectionColor="orange"
            cursorColor="orange"
            value={studentNumber}
            onChangeText={setStudentNumber}
          />
          <PaperInput
            label="Password"
            placeholder="Enter your password"
            mode="outlined"
            style={styles.inputText}
            onChangeText={setPassword}
            secureTextEntry={secureText}
            right={
              <PaperInput.Icon
                icon={secureText ? "eye-off" : "eye"}
                onPress={() => setSecureText(!secureText)}
              />
            }
            selectionColor="orange"
            cursorColor="orange"
            value={password}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Replace Animated Button with AppButton */}
          <View style={styles.buttonContainer}>
            <AppButton
              onPress={handleLogin}
              disabled={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Logging in..." : "Login"}
            </AppButton>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() =>
              Alert.alert("Forgot Password", "Redirect to recovery.")
            }
          >
            <Text style={styles.clickHere}>
              Forgot password?{" "}
              <Text style={styles.clickHereBold}>Click here</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#145DA0",
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

  loginText: {
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

  clickHere: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },

  clickHereBold: {
    fontWeight: "bold",
    color: "#145DA0",
  },
});
