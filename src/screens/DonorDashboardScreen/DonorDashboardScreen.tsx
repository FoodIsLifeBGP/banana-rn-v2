import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
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

function DonorDashboardScreen(props) {
  const isFocused = useIsFocused();
  const [loaded, setLoaded] = useState(false);

  const getActiveDonationsFromDonor = useGlobalStore((state) => state.getActiveDonationsFromDonor);
  const activeDonationsFromDonor = useGlobalStore((state) => state.activeDonationsFromDonor);
  const jwt = useGlobalStore((state) => state.jwt);
  const user = useGlobalStore((state) => state.user);


  const getActiveDonations = async () => {
    if (jwt && user) {
      getActiveDonationsFromDonor(jwt, user);
    }

    if (activeDonationsFromDonor && activeDonationsFromDonor.length > 0) {
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getActiveDonations();
    }
  }, [isFocused]);

  return (
    <View style={styles.outerContainer}>
      <NavBar goBack={props.navigation.goBack()} showBackButton={false} />

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
        {!loaded && <Text>Loading...</Text>}
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
