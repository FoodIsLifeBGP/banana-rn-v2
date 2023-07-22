import React from "react";
import { Text, View } from "react-native";
import useGlobalStore from "@state";
import { Modal, TextButton } from "@elements";
import { useScheme } from "@util/colorSchemes";
import typography from "@util/typography";
import styles from "./TheAlertModal.styles";

export default function TheAlertModal() {
  const alert = useGlobalStore((state) => state.alert);
  const clearAlert = useGlobalStore((state) => state.clearAlert);

  const scheme = useScheme();


  // TODO: REN -- find a place for this logic to live ( originally from <DonorDonationScreen> ) maybe in this component?

  // switch (statusCode) {
  //   case 201: Alert.alert('Donation created!'); getDonationsOrClaims(); navigate('LoginSuccessScreen'); return;
  //   case 202: Alert.alert('Donation updated!'); getDonationsOrClaims(); navigate('LoginSuccessScreen'); return;
  //   case (400 || 406): Alert.alert('Bad data - sorry, please try again!'); return;
  //   case (401 || 403): Alert.alert('Authentication error - please log in again.'); logOut(); navigate('LoginScreen'); return;
  //   case 404: Alert.alert('Network error - sorry, please try again!'); return;
  //   case 500: Alert.alert('Server problem - sorry, please try again!'); return;
  //   default: Alert.alert('Sorry, something went wrong. Please try again.');
  // }


  const handleCloseButtonPress = () => {
    clearAlert();
  };

  const handleDismiss = () => {
    if (alert && alert.dismissible) {
      clearAlert();
    }
  };
  return (
    <Modal
      style={styles.container}
      title={alert?.title || "Alert"}
      palette="accent"
      open={alert !== undefined}
      onDismiss={handleDismiss}
    >
      <View style={styles.body}>
        <View style={styles.textContainer}>
          <Text style={typography.body1}>
            {alert?.message || "Uh oh, an unknown error occurred!"}
          </Text>
        </View>

        <TextButton
          text="OK"
          style={{ width: 104 }}
          buttonStyle={{
            default: scheme.primary,
            pressed: scheme.secondary,
            disabled: scheme.disabled,
          }}
          onPress={handleCloseButtonPress}
        />
      </View>
    </Modal>
  );
}
