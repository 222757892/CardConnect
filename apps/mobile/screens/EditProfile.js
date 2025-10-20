// screens/EditProfile.js
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { AppButton } from "../components/MobileButton";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfile() {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Editable fields
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");

      const res = await fetch("http://192.168.101.105:9091/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.log("❌ Fetch error:", text);
        throw new Error(`Failed to fetch profile (${res.status})`);
      }

      const data = await res.json();
      setProfile(data);
      setPhone(data.contactNumber || "");
      setEmail(data.email || "");
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch("http://172.20.10.8:9091/api/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactNumber: phone,
          email: email,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.log("❌ Save error:", text);
        throw new Error("Update failed");
      }

      Alert.alert("Success", "Profile updated successfully", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      Alert.alert("Error", err.message);
      console.log("❌ handleSave error:", err);
    }
  };

  // Optional: if your backend supports uploading without userId in the path, this should be updated.
  const handlePhotoUpload = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Permission to access media library is required!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // safer enum usage
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled || !result.assets?.length) {
        Alert.alert("No image selected");
        return;
      }

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "You must be logged in to upload a photo.");
        return;
      }

      const photo = result.assets[0];
      const formData = new FormData();
      formData.append("file", {
        uri: photo.uri,
        name: photo.fileName || "profile.jpg",
        type: photo.type || "image/jpeg",
      });

      const res = await fetch(
        `http://172.20.10.8:9091/api/profile/${profile.userId}/photo`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type! Let fetch set it automatically
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload failed: ${errorText}`);
      }

      Alert.alert("Photo Updated", "Profile photo uploaded successfully.");
    } catch (error) {
      console.error("❌ Upload error:", error);
      Alert.alert("Upload Failed", error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialIcons name="arrow-back" size={28} color="#145DA0" />
      </TouchableOpacity>

      <View style={styles.photoContainer}>
        <Image
          source={{
            uri: `http://172.20.10.8:9091/api/profile/${
              profile.userId
            }/photo?timestamp=${Date.now()}`,
          }}
          style={styles.photo}
        />
        <TouchableOpacity onPress={handlePhotoUpload}>
          <Button mode="outlined" style={styles.photoButton}>
            Upload New Photo
          </Button>
        </TouchableOpacity>
      </View>

      <TextInput
        label="First Name"
        value={profile.firstName}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Last Name"
        value={profile.lastName}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Student ID"
        value={profile.userId}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        label="Gender"
        value={profile.gender === "M" ? "Male" : "Female"}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Date of Birth"
        value={new Date(profile.dateOfBirth).toLocaleDateString()}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Department"
        value={profile.department}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Year of Study"
        value={String(profile.yearOfStudy)}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Role"
        value={profile.role}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Card Status"
        value="Active"
        editable={false}
        style={styles.readOnly}
      />

      <AppButton style={styles.saveButton} onPress={handleSave}>
        Save
      </AppButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F2F2",
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  readOnly: {
    marginBottom: 15,
    backgroundColor: "#e0e0e0",
  },
  saveButton: {
    marginTop: 10,
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  photoButton: {
    marginTop: 10,
    borderColor: "#145DA0",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 5,
  },
});
