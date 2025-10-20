import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Text, Avatar } from "react-native-paper";
import InfoCard from "../components/InfoCard";
import InfoRow from "../components/InfoRow";
import { AppButton } from "../components/MobileButton";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import NavBar from "../components/NavigationBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const navigation = useNavigation();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with actual student number, or get it dynamically
  // const studentNumber = "STU000002";

  // const fetchProfile = async () => {
  //   setLoading(true);
  //   try {
  //     const storedUserId = await AsyncStorage.getItem("userId");

  //     if (!storedUserId) {
  //       throw new Error("User ID not found. Please log in again.");
  //     }

  //     const response = await fetch(
  //       `http://192.168.101.105:9091/api/profile/${storedUserId}`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch profile");
  //     }

  //     const data = await response.json();
  //     setProfile(data);
  //     setError(null);
  //   } catch (err) {
  //     setError(err.message || "Error fetching profile");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("❌ No token found in storage");
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://192.168.101.105:9091/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("📡 Status Code:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Profile fetched:", data);
        setProfile(data); // <---- THIS IS CRUCIAL
        setError(null);
      } else {
        const errorText = await response.text();
        console.log("❌ Failed to fetch profile:", errorText);
        setError("Failed to fetch profile");
      }
    } catch (error) {
      console.log("🔥 Network or other error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProfile();
    }, [])
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#145DA0" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: "red", padding: 20, textAlign: "center" }}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBackground}></View>
      {/* Custom Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialIcons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.profileInfoContainer}>
        <View style={styles.profileInfoTopSection}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={90}
              source={require("../assets/headshot.jpg")}
              theme={{ colors: { primary: "grey" } }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.profileContainer}>
            <Text style={styles.name}>
              {profile.firstName} {profile.lastName}
            </Text>
            <Text style={styles.studentId}>{profile.userId}</Text>
            <AppButton
              style={styles.editButton}
              onPress={() => navigation.navigate("EditProfile")}
            >
              Edit Profile
            </AppButton>
          </View>
        </View>

        <InfoCard title="Personal Information">
          <InfoRow
            label="Full name"
            value={`${profile.firstName} ${profile.lastName}`}
          />
          <InfoRow label="Student ID" value={profile.userId} />
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Phone" value={profile.contactNumber} />
          <InfoRow
            label="Gender"
            value={profile.gender === "M" ? "Male" : "Female"}
          />
          <InfoRow
            label="Date of Birth"
            value={new Date(profile.dateOfBirth).toLocaleDateString()}
          />
        </InfoCard>

        <InfoCard title="Academic Information">
          <InfoRow label="Department" value={profile.department} />
          <InfoRow label="Year of study" value={profile.yearOfStudy} />
          <InfoRow label="Job title" value={profile.role} />
          <InfoRow label="Card status" value="Active" />
        </InfoCard>

        <InfoCard title="System Settings">
          <InfoRow label="Language" value="System Default (English)" />
          <InfoRow
            label="Privacy settings"
            value="Only instructors can view my profile information"
          />
        </InfoCard>
        <AppButton
          style={styles.logoutButton}
          onPress={async () => {
            await AsyncStorage.clear(); // Clear token and user info
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          }}
        >
          Logout
        </AppButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "#145DA0",
  },

  topBackground: {
    backgroundColor: "#145DA0",
    height: 150,
  },

  avatarContainer: {
    position: "absolute",
    top: "-60",
    zIndex: 2,
    borderRadius: 100,
    elevation: 4,
  },

  avatar: {
    backgroundColor: "transparent",
  },

  profileInfoContainer: {
    padding: 20,
    backgroundColor: "#F5F2F2",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

  profileInfoTopSection: {
    flexDirection: "column",
    alignItems: "center",
  },

  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },

  studentId: {
    color: "black",
    marginBottom: 10,
  },

  editButton: {
    marginTop: 10,
    width: 140,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 5,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#D9534F", // Bootstrap "danger" color
    width: 200,
    alignSelf: "center",
  },
});
