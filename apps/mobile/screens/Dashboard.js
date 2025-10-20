import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/NavigationBar";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // No longer needed

const { width } = Dimensions.get("window");

export default function Dashboard() {
  const navigation = useNavigation();
  const userName = "Ayesha";

  const menuItems = [
    {
      label: "View virtual card",
      icon: "card-outline",
      screen: "ViewStudentCard",
    },
    {
      label: "Book card appointment",
      icon: "calendar-outline",
      screen: "Appointments",
    },
    {
      label: "Print & Go",
      icon: "print-outline",
      screen: "PrintPages", // ✅ Navigates to PrintPages.js
    },
    {
      label: "Report card",
      icon: "alert-circle-outline",
      screen: "ReportCard",
    },
    {
      label: "Printing Credits",
      icon: "cash-outline",
      screen: "PrintingCredits", // ✅ Navigates to PrintingCredits.js
    },
  ];

  // Commented-out logout button
  // const handleLogout = async () => {
  //   await AsyncStorage.clear();
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "Login" }],
  //   });
  // };

  return (
    <View style={styles.container}>
      <NavBar title="CARDCONNECT" />

      {/* Greeting */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hi {userName} 👋!</Text>
      </View>

      {/* Menu Grid */}
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={28} color="#145DA0" />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button - commented out */}
      {/*
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2F2",
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    marginTop: 10,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    marginRight: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuItem: {
    width: (width - 50) / 2,
    height: 165,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    color: "#000",
  },
  logoutContainer: {
    padding: 20,
    alignItems: "center",
  },
});
