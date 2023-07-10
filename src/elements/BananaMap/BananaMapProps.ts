import { Location } from '@state/index.types';
import { Region } from 'react-native-maps';

export interface BananaMapProps {
  // TODO: remove this comment and replace with correct type
  // eslint-disable-next-line @typescript-eslint/ban-types
  donations: { } [];
  markerSize: number;
  clientLocation: Location;
  mapRegion: Region;
  navigation: any; /* TODO: replace with correct type */
}
