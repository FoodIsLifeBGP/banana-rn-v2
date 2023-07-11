import React, {useEffect, useState} from 'react';
import {
  ScrollView, Text, View 
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  EmptyStateView, NavBar, Title 
} from '@elements';

import Donation from '@library/DonationClientView/Donation';
import useGlobal from '@state';

import styles from './ClientHistoryScreen.styles';

function ClientHistoryScreen(props) {
  const isFocused = useIsFocused();
  const [ state, actions ] = useGlobal() as any;
  const [ claims, setClaims ] = useState([]);
  const [ loaded, setLoaded ] = useState(false);

  const getClaims = async () => {
    const { getClaimHistoryForClient } = actions;
    const data = await getClaimHistoryForClient();
    if (data) {
      setClaims(data);
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getClaims();
    }
  }, [ isFocused ]);

  return (
    <View style={styles.outerContainer}>
      <NavBar showBackButton={false} />

      <View style={styles.contentContainer}>
        <Title text="Claims" />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <View>
            <Text style={styles.activeHeader}>History</Text>
          </View>
        </View>
        { !loaded && <Text>Loading...</Text> }
        {(claims && claims.length > 0) ? (
          <ScrollView>
            {(claims as any).sort((a, b) => a.created_at > b.created_at).map((claim) => (
              <View key={claim.id}>
                <Donation
                  donation={claim}
                  key={claim.id}
                  isHistory={true}
                  isClaim={true}
                  navigation={props.navigation}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <EmptyStateView lowerText="You don't have a history of claims." />
        )}
      </View>
    </View>
  );
}

export default ClientHistoryScreen;
