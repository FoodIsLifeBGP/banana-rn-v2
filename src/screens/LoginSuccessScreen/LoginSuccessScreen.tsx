import React from "react";
import { Text } from "react-native";
import useGlobalStore from "@state";
import InfoScreen from "../InfoScreen";
import AccountSuspendedScreen from "../AccountSuspendedScreen";
import ApplicationPendingScreen from "../ApplicationPendingScreen";
import ApplicationApprovedScreen from "../ApplicationApprovedScreen";
import ApplicationIncompleteScreen from "../ApplicationIncompleteScreen";
import DashboardScreen from "../DashboardScreen";
import DonorDashboardScreen from "../DonorDashboardScreen";

export default function LoginSuccessScreen() {
  const user = useGlobalStore((state) => state.user);
  const jwt = useGlobalStore((state) => state.jwt);
  const userIdentity = useGlobalStore((state) => state.userIdentity);

  if (!jwt || !user) {
    return <Text>Loading...</Text>;
  }

  switch (user?.account_status) {
  case "incomplete":
    return <ApplicationIncompleteScreen />;
  case "suspended":
    return <AccountSuspendedScreen />;
  case "processing":
    return <ApplicationPendingScreen />;
  case "approved":
    return <ApplicationApprovedScreen id={user.id} jwt={jwt} />;
  case "active":
    return userIdentity === "client" ? <DashboardScreen /> : <DonorDashboardScreen />;
  default:
    return (
      <InfoScreen
        title="Login error"
        nextScreenDestination="LoginScreen"
        nextScreenTitle="Login"
      />
    );
  }
}
