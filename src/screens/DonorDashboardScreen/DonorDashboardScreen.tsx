import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/core";
import {
  ScrollView, Text, View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  EmptyStateView, NavBar, Title,
} from "@elements";
import useGlobalStore from "@state";
import Donation from "@library/Donations/Donation";
import styles from "./DonorDashboardScreen.styles";
import navigationService from "@util/navigationService";

function DonorDashboardScreen(props) {
  const isFocused = useIsFocused();

  const getActiveDonationsFromDonor = useGlobalStore((state) => state.getActiveDonationsFromDonor);
  const activeDonationsFromDonor = useGlobalStore((state) => state.activeDonationsFromDonor);

  const jwt = useGlobalStore((state) => state.jwt);
  const user = useGlobalStore((state) => state.user);


  const getActiveDonations = async () => {
    if (jwt && user) {
      getActiveDonationsFromDonor(jwt, user);
    }
  };

  useEffect(() => {
    if (isFocused) {
      console.log("is focused fired");
      getActiveDonations();
    }
  }, [isFocused]);

  return (
    <View style={styles.outerContainer}>
      <NavBar goBack={() => navigationService.goBack()} showBackButton={false} />

      <View style={styles.contentContainer}>
        <Title text="Donations" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.activeHeader}>ACTIVE</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("DonationScreen")
            }
          >
            <View>
              <Text style={styles.plus}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        {!activeDonationsFromDonor || activeDonationsFromDonor.length === 0 && <Text>Loading...</Text>}
        {/* TODO: figure out why `<Donation>` is rendering despite `activeDonationsFromDonor` being empty.. 🧐 */}
        {(activeDonationsFromDonor && activeDonationsFromDonor.length > 0) ? (
          <ScrollView>
            {activeDonationsFromDonor.map((donation, i) => (
              <View key={donation.id}>
                <Donation
                  donation={donation}
                  key={donation.id}
                  resource="donations"
                />
                {i === (activeDonationsFromDonor).length - 1}
              </View>
            ))}
          </ScrollView>
        ) : (
          <EmptyStateView lowerText="You currently don't have any donations." />
        )}
      </View>
    </View>
  );
}

export default DonorDashboardScreen;
