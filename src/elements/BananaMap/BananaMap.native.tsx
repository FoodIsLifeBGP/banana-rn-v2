import React from "react";
import { DonationMarker } from "@elements/DonationMarker";
import MapView, { Marker } from "react-native-maps";
import styles from "./BananaMap.styles";
import { BananaMapProps } from "./BananaMapProps";
import navigationService from "@util/navigationService";

function BananaMap({
  donations,
  markerSize,
  clientLocation,
  mapRegion,
}: BananaMapProps) {
  return (
    <MapView initialRegion={mapRegion} style={styles.map}>
      {(donations as any).map((donation) => {
        const { id } = donation;
        return (
          <DonationMarker
            key={id}
            coordinate={{
              latitude: parseFloat(donation.donor.latitude),
              longitude: parseFloat(donation.donor.longitude),
            }}
            size={markerSize}
            onPress={() =>
              navigationService.navigate("MakeClaimScreen", {
                donation,
                id,
              })
            }
          />
        );
      })}

      <Marker coordinate={clientLocation} />
    </MapView>
  );
}

export default BananaMap;
