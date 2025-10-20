import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import NavBar from "../components/NavigationBar";

export default function NotificationsCenter() {
  const notifications = [
    { title: "Card Validity", message: "Your card is valid until Dec 2025.", time: "2h ago" },
    { title: "Library Access", message: "New library access granted.", time: "1d ago" },
    { title: "Campus Event", message: "Don’t miss the campus event this Friday!", time: "3d ago" },
    { title: "Printing Credits", message: "Your printing credits are running low. Please top up.", time: "5d ago" },
    { title: "Profile Update", message: "Remember to update your profile picture for verification.", time: "1w ago" },
    { title: "Exam Venue", message: "Your exam venue has been confirmed. Check the exam timetable.", time: "2w ago" },
    { title: "System Maintenance", message: "Scheduled system maintenance on Sunday from 12 AM – 4 AM.", time: "3w ago" },
    { title: "New Feature", message: "The virtual card barcode can now be scanned at all campus entrances.", time: "1mo ago" },
  ];

  return (
    <View style={styles.container}>
      <NavBar title="Notifications" />

      <ScrollView style={styles.body}>
        {notifications.map((note, idx) => (
          <View key={idx} style={styles.notificationCard}>
            <Icon name="notifications" size={24} color="#145DA0" style={styles.notificationIcon} />
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationTitle}>{note.title}</Text>
              <Text style={styles.notificationMessage}>{note.message}</Text>
              <Text style={styles.notificationTime}>{note.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F2F2" },
  body: { paddingHorizontal: 20, paddingTop: 20 },
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  notificationIcon: { marginRight: 10, marginTop: 2 },
  notificationTextContainer: { flex: 1 },
  notificationTitle: { fontWeight: "bold", fontSize: 16, color: "#000" },
  notificationMessage: { fontSize: 14, color: "#333", marginTop: 2 },
  notificationTime: { fontSize: 12, color: "#888", marginTop: 5 },
});
