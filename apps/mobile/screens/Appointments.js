import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Modal, Portal, List, TextInput as PaperInput } from 'react-native-paper';

import InfoCard from '../components/InfoCard';
import { AppButton } from '../components/MobileButton';
import ScreenHeader from '../components/ScreenHeader'; // Custom header component

export default function CardAppointmentScreen() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [campus, setCampus] = useState('Bellville Campus');
  const [campusModalVisible, setCampusModalVisible] = useState(false);
  const [campusSearch, setCampusSearch] = useState('');

  // ✅ Fixed times
  const timeSlots = ['10:00 AM', '12:00 PM', '2:00 PM', '3:00 PM'];
  const campuses = [
    'Bellville Campus',
    'District Six Campus',
    'GrangerBay Campus',
    'Mowbray Campus',
    'Wellington Campus',
  ];
  const filteredCampuses = campuses.filter(c =>
    c.toLowerCase().includes(campusSearch.toLowerCase())
  );

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const formatDate = (dateObj) => {
    return dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleConfirm = () => {
    if (!date || !selectedTime || !campus) {
      alert('Please complete all steps before confirming.');
      return;
    }
    alert(`Appointment Confirmed!\n${formatDate(date)} at ${selectedTime} - ${campus}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Header */}
          <ScreenHeader text="Card Appointment" />
          <Text style={styles.subheading}>
            Schedule an appointment to get your physical card
          </Text>

          {/* Step 1: Date */}
          <Text style={styles.step}>Step 1: Select a date</Text>
          <TouchableOpacity style={styles.dateBox} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          {/* Step 2: Time */}
          <Text style={styles.step}>Step 2: Select a time</Text>
          <View style={styles.timeContainer}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[styles.timeSlot, selectedTime === time && styles.selectedTime]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedTimeText,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Step 3: Campus */}
          <Text style={styles.step}>Step 3: Select a campus</Text>
          <TouchableOpacity
            style={styles.campusDropdown}
            onPress={() => setCampusModalVisible(true)}
          >
            <Text style={styles.campusDropdownText}>{campus}</Text>
          </TouchableOpacity>
          <Portal>
            <Modal
              visible={campusModalVisible}
              onDismiss={() => setCampusModalVisible(false)}
              contentContainerStyle={styles.campusModal}
            >
              <PaperInput
                label="Search campus"
                value={campusSearch}
                onChangeText={setCampusSearch}
                style={styles.campusSearchInput}
                autoFocus
              />
              {filteredCampuses.map((c) => (
                <List.Item
                  key={c}
                  title={c}
                  onPress={() => {
                    setCampus(c);
                    setCampusModalVisible(false);
                    setCampusSearch('');
                  }}
                  style={styles.campusListItem}
                />
              ))}
            </Modal>
          </Portal>

          {/* Preview */}
          <InfoCard title="Booking details">
            <Text>Date: {formatDate(date)}</Text>
            <Text>Time: {selectedTime}</Text>
            <Text>Campus: {campus}</Text>
          </InfoCard>
        </ScrollView>

        {/* Confirm */}
        <AppButton onPress={handleConfirm} style={styles.confirmBtn}>
          Confirm
        </AppButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F2F2',
  },
  subheading: {
    fontSize: 14,
    marginBottom: 20,
    color: '#3C6E71',
    textAlign: 'center',
  },
  step: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#284B63',
  },
  dateBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#284B63',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#122C34',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  campusDropdown: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#145DA0',
    backgroundColor: '#F4F9F9',
    marginBottom: 8,
    padding: 16,
    alignItems: 'center',
  },
  campusDropdownText: {
    fontSize: 16,
    color: '#145DA0',
  },
  campusModal: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 24,
    borderRadius: 12,
  },
  campusSearchInput: {
    marginBottom: 12,
  },
  campusListItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timeSlot: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#D9E4EC',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTime: {
    backgroundColor: '#284B63',
  },
  timeText: {
    color: '#284B63',
  },
  selectedTimeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  confirmBtn: {
    marginTop: 20,
    borderRadius: 10,
  },
});

