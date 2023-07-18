import React from "react";
import useGlobalStore from "@state";
import DonorRegistrationScreen from "./DonorRegistrationScreen";
import ClientRegistrationScreen from "./ClientRegistrationScreen";

export default function RegistrationScreen(props) {
  const [state] = useGlobal();
  const { userIdentity } = state;

  return userIdentity === "donor" ? (
    <DonorRegistrationScreen {...props} />
  ) : (
    <ClientRegistrationScreen {...props} />
  );
}
