/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// TODO: remove this disabled lint eventually?
// eslint-disable-next-line import/no-extraneous-dependencies
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as colors from "@util/constants/colors";
import getEnv from "@util/environment";

import MakeClaimScreen from "../screens/MakeClaimScreen/MakeClaimScreen";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import DonorDashboardScreen from "../screens/DonorDashboardScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import TermsScreen from "../screens/TermsScreen";
import ContactScreen from "../screens/ContactScreen";
import LoginSuccessScreen from "../screens/LoginSuccessScreen";
import DonationScreen from "../screens/DashboardScreen/DonationScreen";
import QRCodeScannerScreen from "../screens/QRCodeScannerScreen/QRCodeScannerScreen";
import LogoutScreen from "../screens/LogoutScreen";
import DonationsDetailScreen from "../screens/DonationsDetailScreen/DonationsDetailScreen";
import DonorDonationScreen from "../screens/DonorDashboardScreen/DonorDonationScreen";
import DonorHistoryScreen from "../screens/DonorHistoryScreen/DonorHistoryScreen";
import MapScreen from "../screens/MapScreen/MapScreen";

import MenuDrawer from "../elements/MenuDrawer/MenuDrawer";
import MainOption from "../elements/MenuDrawer/MainOption/MainOption";
import SubOption from "../elements/MenuDrawer/SubOption/SubOption";
import ClaimDetailsScreen from "../screens/ClaimDetailsScreen/ClaimDetailsScreen";
import ClientClaimsScreen from "../screens/ClientClaimsScreen";
import ClientHistoryScreen from "../screens/ClientHistoryScreen";

// Logged-In Screens for Drawer Navigator
const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      // headerShown="false" //TODO: why isnt this prop allowed
      initialRouteName="LoginSuccessScreen"
    >
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
      />
      <Stack.Screen
        name="ClientClaimsScreen"
        component={ClientClaimsScreen}
      />
      <Stack.Screen
        name="ClientHistoryScreen"
        component={ClientHistoryScreen}
      />
      <Stack.Screen
        name="DonorDashboardScreen"
        component={DonorDashboardScreen}
      />
      <Stack.Screen
        name="LoginSuccessScreen"
        component={LoginSuccessScreen}
      />
      <Stack.Screen
        name="DonationScreen"
        component={DonationScreen}
      />
      <Stack.Screen
        name="DonorDonationScreen"
        component={DonorDonationScreen}
      />
      <Stack.Screen
        name="DonorHistoryScreen"
        component={DonorHistoryScreen}
      />
      <Stack.Screen
        name="QRCodeScannerScreen"
        component={QRCodeScannerScreen}
      />
      <Stack.Screen
        name="ClaimDetailsScreen"
        component={ClaimDetailsScreen}
      />
      <Stack.Screen
        name="MakeClaimScreen"
        component={MakeClaimScreen}
      />
      <Stack.Screen
        name="DonationsDetailScreen"
        component={DonationsDetailScreen}
      />
      <Stack.Screen name="ContactScreen" component={ContactScreen} />
      <Stack.Screen name="LogoutScreen" component={LogoutScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
}

function donorOrClientDrawer() {
  const { USER_IDENTITY } = getEnv();

  const DONOR_MENU = {
    QRCodeScannerScreen: {
      screen: StackNavigator,
      navigationOptions: { drawerLabel: <MainOption text="Scan QR Code" icon="qrCode" /> },
    },
    DonorDashboardScreen: {
      screen: StackNavigator,
      navigationOptions: { drawerLabel: <MainOption text="Donations" icon="claims" /> },
    },
    DonorHistoryScreen: {
      screen: StackNavigator,
      navigationOptions: { drawerLabel: <SubOption text="History" /> },
    },
  };

  const CLIENT_MENU = {
    DashboardScreen: {
      screen: StackNavigator,
      navigationOptions: { drawerLabel: <MainOption text="Donations" icon="donations" /> },
    },
    ClientClaimsScreen: {
      screen: StackNavigator,
      navigationOptions: { drawerLabel: <MainOption text="Claims" icon="claims" /> },
    },
    ClientHistoryScreen: {
      screen: StackNavigator,
      navigationOptions: { drawerLabel: <SubOption text="History" /> },
    },
  };

  const COMMON_MENU = {
    ContactScreen: {
      screen: (props) => <ContactScreen {...props} />,
      navigationOptions: { drawerLabel: <MainOption text="Contact Us" icon="help" /> },
    },
  };

  return USER_IDENTITY === "donor"
    ? {
      ...DONOR_MENU,
      ...COMMON_MENU,
    }
    : {
      ...CLIENT_MENU,
      ...COMMON_MENU,
    };
}

// Drawer Navigator
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  Object.entries(donorOrClientDrawer()).forEach((ting) =>
    console.log("ting", ting),
  );
  // TODO: figure out why Drawer.Screen is erroring and remove the above console.log
  return (
    <Drawer.Navigator>
      {/* {Object.entries(donorOrClientDrawer()).map(([ name, config ]) => (
        <Drawer.Screen
          key={name}
          name={name}
          {...config}
        />
      ))} */}
    </Drawer.Navigator>
  );
}

// Full App Navigation - Includes Non-Logged in Screens
const FullAppStack = createNativeStackNavigator();

function FullAppStackNavigator() {
  return (
    <FullAppStack.Navigator
      // headerShown="false" TODO: why aren't these two props working?
      // defaultNavigationOptions={{ gestureEnabled: false }}
      initialRouteName="LoginScreen"
    >
      <FullAppStack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
      <FullAppStack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
      <FullAppStack.Screen
        name="TermsScreen"
        component={TermsScreen}
      />
      <FullAppStack.Screen
        name="ContactScreen"
        component={ContactScreen}
      />
      <FullAppStack.Screen
        name="Drawer"
        component={DrawerNavigator}
      />
    </FullAppStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <FullAppStackNavigator />
    </NavigationContainer>
  );
}
