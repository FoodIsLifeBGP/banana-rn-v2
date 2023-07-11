import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import useGlobal from '@state';
import {
  BananaMap,
  NavBar 
} from '@elements';


function MapScreen(props) {
  const isFocused = useIsFocused();
  const [ state, actions ] = useGlobal() as any;

  const [ donations, setDonations ] = useState([]);
  const {width, height} = Dimensions.get('window');
  const {latitude, longitude} = state.user.coords;
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.05;

  // in case of virtual device, the position of client would be center of seattle.
  const [ location ] = useState(
    {
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
    },
  );

  const getDonationsFromAPI = async () => {
    const { getActiveDonationsForClient } = actions;
    const data = await getActiveDonationsForClient();
    if (data) {
      setDonations(data);
    }
  };
  useEffect(() => {
    if (isFocused) {
      getDonationsFromAPI();
    }
  }, [ isFocused ]);
  return (
    <View>
      <NavBar
        showBackButton={false}
        showSelector={true}
        onList={() => { props.navigation.navigate('DashboardScreen'); }}
        position="map"
      />
      <BananaMap
        navigation={props.navigation}
        donations={donations}
        mapRegion={location}
        clientLocation={{latitude, longitude}}
        markerSize={24}
      />
    </View>
  );
}

export default MapScreen;
