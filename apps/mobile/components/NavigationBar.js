import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Modal,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Text as PaperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function NavBar({ title }) {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;

  const menuItems = [
    { label: "Home", icon: "home-outline", screen: "Dashboard" },
    { label: "View virtual card", icon: "card-outline", screen: "ViewStudentCard" },
    { label: "Book card appointment", icon: "calendar-outline", screen: "Appointments" },
    { label: "Print & Go", icon: "print-outline", screen: "PrintPages" },
    { label: "Report card", icon: "alert-circle-outline", screen: "ReportCard" },
    { label: "Printing Credits", icon: "cash-outline", screen: "PrintingCredits" },
    { label: "Profile", icon: "person-outline", screen: "Profile" }, // ✅ add to sidebar too
  ];

  // Animate drawer open/close
  useEffect(() => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [menuVisible]);

  return (
    <View>
      {/* Top Nav */}
      <View style={styles.navbar}>
        <View style={styles.left}>
          {navigation.canGoBack() && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back-outline" size={26} color="#000" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Icon name="menu-outline" size={26} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <TouchableOpacity
            style={styles.logoContainer}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Image source={require("../assets/logo.png")} style={styles.navLogo} />
            <PaperText style={styles.navTitle}>{title}</PaperText>
          </TouchableOpacity>
        </View>

        <View style={styles.navRight}>
          <TouchableOpacity
            style={styles.navIcon}
            onPress={() => navigation.navigate("NotificationsCenter")}
          >
            <Icon name="notifications-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navIcon}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("MainDrawer", { screen: "Profile" }); // ✅ drawer navigation
            }}
          >
            <Icon name="person-circle-outline" size={26} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Side Drawer */}
      <Modal visible={menuVisible} animationType="none" transparent={true}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
          <Animated.View
            style={[
              styles.sideMenu,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setMenuVisible(false)}>
                <Icon name="close-outline" size={32} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.menuList}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate("MainDrawer", { screen: item.screen }); // ✅ navigate inside Drawer
                  }}
                >
                  <Icon
                    name={item.icon}
                    size={24}
                    color="#145DA0"
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    marginRight: 8,
  },
  center: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  navLogo: { width: 28, height: 28, resizeMode: "contain" },
  navTitle: { fontSize: 16, fontWeight: "bold", color: "#000" },
  navRight: { flexDirection: "row", alignItems: "center" },
  navIcon: { marginLeft: 15 },

  // Drawer
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    flexDirection: "row",
  },
  sideMenu: {
    width: width * 0.75,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
    elevation: 6,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  menuTitle: { fontSize: 20, fontWeight: "bold", color: "#000" },
  menuList: { marginTop: 10 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuIcon: { marginRight: 12 },
  menuText: { fontSize: 16, fontWeight: "500", color: "#000" },
});
