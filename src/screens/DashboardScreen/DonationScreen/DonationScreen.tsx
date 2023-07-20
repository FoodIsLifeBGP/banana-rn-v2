import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import useGlobalStore from "@state";
import {
  FormTextInput,
  LinkButton,
  NavBar,
  SpacerInline,
} from "@elements";
import validate from "validate.js";
import {
  NewDonation, DonationCategory, DonorState,
} from "@state/index.types";
import donationConstraints from "@util/validators/donation";
import { categoryImage } from "@util/donationCategory";
import styles from "./DonationScreen.styles";

export default function DonationScreen(props) {
  const jwt = useGlobalStore((state) => state.jwt);
  const responseStatus = useGlobalStore((state) => state.responseStatus);
  const donor = useGlobalStore((state) => state.user as DonorState); /* NOTE: this screen/logic only takes **Donors** */

  const updateAlert = useGlobalStore((state) => state.updateAlert);
  const createDonation = useGlobalStore((state) => state.createDonation);

  useEffect(() => {
    if (responseStatus) {
      const { code } = responseStatus;

      if (code >= 200 && code < 300) {
        updateAlert({
          title: "Success!",
          message: "Your donation has been created.",
          type: "donation published",
          dismissible: true,
        });
      }
    }
  }, [responseStatus.code]);

  const emptyDonation: NewDonation = {
    pickupAddress: donor ? `${donor.address_street} ${donor.address_city}, ${donor.address_state} ${donor.address_zip}` : "",
    category: DonationCategory.BREAD,
    itemName: "",
    pickupInstructions: donor ? donor.pickup_instructions : "",
    totalAmount: "",
  };

  const [newDonation, setNewDonation] = useState<NewDonation>(emptyDonation);
  const [validateError, setValidateError] = useState({} as any); /* TODO: add proper type */

  const hasUnsavedChanges = Boolean(newDonation.itemName ||
      newDonation.totalAmount ||
      newDonation.pickupInstructions !== donor.pickup_instructions);

  const preventBack = () => {
    /*TODO: I just filled this out with valid types-- not sure if intent/copy is correct, please double check */
    updateAlert({
      title: "Incomplete Form",
      message: "Please fill out the rest of the form.",
      type: "incomplete form",
      dismissible: false,
      confirmFn: () => props.navigation.goBack(),
    });
  };

  const validateInputs = async () => {
    const invalidInputs = validate(newDonation, donationConstraints);

    if (invalidInputs) {
      setValidateError(invalidInputs);
    } else {
      setValidateError({});

      if (jwt && donor) {
        createDonation(
          jwt, donor, newDonation,
        );
      }

      setNewDonation(emptyDonation);
      props.navigation.navigate("DonorDashboardScreen");
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Android and iOS both interact with this prop differently
      enabled={true}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <NavBar
        showBackButton={true}
        goBack={hasUnsavedChanges ? preventBack : props.navigation.goBack()}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.imageInputContainer}>
          <Image
            source={categoryImage(newDonation.category)}
            style={styles.icon}
          />
        </View>

        <SpacerInline height={20} />
        <FormTextInput
          label="Item Name"
          value={newDonation.itemName}
          setValue={(s) =>
            setNewDonation({
              ...newDonation,
              itemName: s,
            })
          }
          style={styles.input}
          error={validateError.itemName}
          errorMessage={validateError.itemName}
          autoFocus={true}
        />

        <FormTextInput
          label="Food Category"
          dropdownData={Object.values(DonationCategory)}
          setValue={(s) =>
            setNewDonation({
              ...newDonation,
              category: s,
            })
          }
          defaultValue={DonationCategory.BREAD}
          value={newDonation.category}
          type="dropdown"
          error={!!validateError.category}
          errorMessage={validateError.category}
        />

        <FormTextInput
          label="Total Amount"
          value={newDonation.totalAmount}
          setValue={(s) =>
            setNewDonation({
              ...newDonation,
              totalAmount: s,
            })
          }
          style={styles.input}
          error={validateError.totalAmount}
          errorMessage={validateError.totalAmount}
        />

        <View>
          <Text style={styles.pickupAddressLabel}>
            PICKUP ADDRESS
          </Text>
          <Text style={styles.pickupAddressStyle}>
            {newDonation.pickupAddress}
          </Text>
        </View>

        <FormTextInput
          label="Pickup Instructions"
          value={newDonation.pickupInstructions}
          setValue={(s) =>
            setNewDonation({
              ...newDonation,
              pickupInstructions: s,
            })
          }
          style={styles.input}
          error={validateError.pickupInstructions}
          errorMessage={validateError.pickupInstructions}
        />

        <View style={styles.button}>
          <LinkButton text="Publish" onPress={validateInputs} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
