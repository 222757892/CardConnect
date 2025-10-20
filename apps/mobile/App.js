import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { UserProvider } from "./contexts/UserContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Screens
import Welcome from "../mobile/screens/Welcome.js";
import Login from "../mobile/screens/Login.js";
import SignUp from "../mobile/screens/SignUp.js";
import CreatePassword from "./screens/CreatePassword.js";
import Dashboard from "./screens/Dashboard";
import Profile from "../mobile/screens/Profile.js";
import EditProfile from "./screens/EditProfile";
import Appointments from "../mobile/screens/Appointments.js";
import ViewStudentCard from "./screens/ViewStudentCard";
import ReportCard from "./screens/ReportCard";
import NotificationsCenter from "./screens/NotificationsCenter";
import PrintPages from "./screens/PrintPages";
import PrintingCredits from "./screens/PrintingCredits";

// Setup theme
const theme = {
  ...DefaultTheme,
  roundness: 10,
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

/** ✅ Create individual stacks for each drawer screen */
function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardHome" component={Dashboard} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={Profile} />
    </Stack.Navigator>
  );
}

function AppointmentsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppointmentsHome" component={Appointments} />
    </Stack.Navigator>
  );
}

function ViewStudentCardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ViewStudentCardHome" component={ViewStudentCard} />
    </Stack.Navigator>
  );
}

function ReportCardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReportCardHome" component={ReportCard} />
    </Stack.Navigator>
  );
}

function NotificationsCenterStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="NotificationsCenterHome"
        component={NotificationsCenter}
      />
    </Stack.Navigator>
  );
}

function PrintPagesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PrintPagesHome" component={PrintPages} />
    </Stack.Navigator>
  );
}

function PrintingCreditsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PrintingCreditsHome" component={PrintingCredits} />
    </Stack.Navigator>
  );
}

// ✅ Drawer = Main App Navigation After Login
function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Appointments" component={AppointmentsStack} />
      <Drawer.Screen name="ViewStudentCard" component={ViewStudentCardStack} />
      <Drawer.Screen name="ReportCard" component={ReportCardStack} />
      <Drawer.Screen
        name="NotificationsCenter"
        component={NotificationsCenterStack}
      />
      <Drawer.Screen name="PrintPages" component={PrintPagesStack} />
      <Drawer.Screen name="PrintingCredits" component={PrintingCreditsStack} />
    </Drawer.Navigator>
  );
}

// ✅ Main App Component with Auth Flow + Drawer
export default function App() {
  return (
    <UserProvider>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <View style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{ headerShown: false }}
              >
                {/*Auth Flow Screens */}
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen
                  name="CreatePassword"
                  component={CreatePassword}
                />

                {/* 🔓 Main App (Drawer) */}
                <Stack.Screen name="MainDrawer" component={MainDrawer} />

                {/* 🔧 Optional: Stack-only screens */}
                <Stack.Screen name="EditProfile" component={EditProfile} />
              </Stack.Navigator>
              <StatusBar style="dark" />
            </NavigationContainer>
          </View>
        </SafeAreaProvider>
      </PaperProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2F2",
  },
});
