import React, { useEffect, useState } from "react";
import {
  ScrollView, Text, View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  EmptyStateView, NavBar, Title,
} from "@elements";
import Donation from "@library/Donations/Donation/Donation";
import useGlobalStore from "@state";
import styles from "./DonorHistoryScreen.styles";

function DonorHistoryScreen() {
  const isFocused = useIsFocused();
  const [state, actions] = useGlobal() as any;
  const [donations, setDonations] = useState([]);
  const { getDonationOrClaimHistory } = actions;

  useEffect(() => {
    if (isFocused) {
      getDonationOrClaimHistory().then((data) => setDonations(data));
    }
  }, [isFocused]);

  return (
    <View style={styles.outerContainer}>
      <NavBar showBackButton={false} />

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
            <Text style={styles.activeHeader}>History</Text>
          </View>
        </View>
        {donations && donations.length > 0 ? (
          <ScrollView>
            {(donations as any).map((donation) => (
              <View key={donation.id}>
                <Donation
                  donation={donation}
                  key={donation.id}
                  isHistory={true}
                />
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

export default DonorHistoryScreen;
