import React from "react";
import { Text } from "react-native";
import { Donation, Location } from "@state/index.types";
import { Region } from "react-native-maps";

export interface BananaMapProps {
  donations: Donation[];
  markerSize: number;
  clientLocation: Location;
  mapRegion: Region;
  navigation: any;
}

function BananaMap({
  donations,
  markerSize,
  clientLocation,
  mapRegion,
}: BananaMapProps) {
  console.log(donations);
  console.log(markerSize);
  console.log(clientLocation);
  console.log(mapRegion);
  return <Text>Map is not supported in Web View</Text>;
}

export default BananaMap;
