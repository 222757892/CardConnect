import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { AppButton } from "../components/MobileButton";
import NavBar from "../components/NavigationBar";
import Icon from "react-native-vector-icons/Ionicons";

export default function ReportCard() {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState(""); 
  const { studentId } = useContext(UserContext);

  const handleSubmit = () => {
    if (!selectedStatus) {
      alert("Please select a card status first.");
      return;
    }
    setModalVisible(true);
  };

  const confirmReport = async () => {
    setModalVisible(false);
    if (!studentId) {
      alert("Student ID is missing. Please log in again.");
      return;
    }
    try {
      const response = await fetch("http://192.168.101.106:9091/api/cardreports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, status: selectedStatus, notes }), // Include notes
      });
      if (response.ok) {
        alert(`Card report submitted as '${selectedStatus}'.`);
        setSelectedStatus(null);
        setNotes(""); // Reset notes
      } else {
        const data = await response.json();
        alert("Failed to submit report: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting report. Check your network or server.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Navbar */}
      <NavBar title="Report Card" />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="alert-circle-outline" size={28} color="#145DA0" style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Report a Lost/Stolen Card</Text>
        <Text style={styles.headerMessage}>
          Has your student card been lost, stolen, damaged or not received?
          You can report it here, and your new card will be prepared.
          Please note that your current card will be void.
        </Text>
      </View>

      {/* Card Status Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Card Was:</Text>
        <View style={styles.statusRow}>
          {["Lost", "Stolen", "Damaged", "Not Received"].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusButton,
                selectedStatus === status && styles.statusButtonSelected,
              ]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text
                style={[
                  styles.statusText,
                  selectedStatus === status && styles.statusTextSelected,
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Notes Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes (optional):</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Enter any details about your card..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={() => {
            setSelectedStatus(null);
            setNotes("");
          }}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirm Report</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to report this card as "{selectedStatus}"?
            </Text>
            {notes ? (
              <Text style={styles.modalMessage}>
                Notes: {notes}
              </Text>
            ) : null}
            <View style={styles.modalRow}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.noBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.noBtnText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.yesBtn]}
                onPress={confirmReport}
              >
                <Text style={styles.yesBtnText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F2F2" },

  /* Header */
  header: { padding: 20, alignItems: "center" },
  headerIcon: { marginBottom: 10 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#145DA0", marginBottom: 10, textAlign: "center" },
  headerMessage: { fontSize: 14, color: "#333", textAlign: "center", lineHeight: 20 },

  /* Status Buttons */
  section: { marginTop: 20, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  statusRow: { flexDirection: "row", justifyContent: "space-between" },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#145DA0",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  statusButtonSelected: { backgroundColor: "#145DA0" },
  statusText: { color: "#145DA0", fontWeight: "bold" },
  statusTextSelected: { color: "#fff" },

  /* Notes Input */
  notesInput: {
    borderWidth: 1,
    borderColor: "#145DA0",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 14,
    minHeight: 60,
    textAlignVertical: "top",
    marginBottom: 10,
  },

  /* Action Buttons */
  actionRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 30, paddingHorizontal: 20 },
  actionButton: { flex: 1, paddingVertical: 12, borderRadius: 5, alignItems: "center", marginHorizontal: 5 },
  cancelButton: { backgroundColor: "#ddd" },
  submitButton: { backgroundColor: "#145DA0" },
  cancelText: { color: "#333", fontWeight: "bold" },
  submitText: { color: "#fff", fontWeight: "bold" },

  /* Modal */
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)" },
  modalView: { backgroundColor: "#fff", borderRadius: 10, padding: 20, width: "80%" },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#145DA0", textAlign: "center", marginBottom: 10 },
  modalMessage: { fontSize: 14, textAlign: "center", color: "#333", marginBottom: 20 },
  modalRow: { flexDirection: "row", justifyContent: "space-between" },
  modalBtn: { flex: 1, paddingVertical: 10, borderRadius: 5, alignItems: "center", marginHorizontal: 5 },
  noBtn: { backgroundColor: "#ddd" },
  yesBtn: { backgroundColor: "#145DA0" },
  noBtnText: { color: "#333", fontWeight: "600" },
  yesBtnText: { color: "#fff", fontWeight: "600" },
});
