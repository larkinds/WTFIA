import { createContext } from 'react';
import { LocationObject } from 'expo-location';

export type GeographicInfo = {
  neighborhood: string,
  region: {
      latitude: number,
      longitude: number,
      latitudeDelta: number,
      longitudeDelta: number,
    }
}

export const LocationContext = createContext({
    neighborhood: "",
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: .3,
      longitudeDelta: .3,
    },
    setCurrentLocation: (location: GeographicInfo | LocationObject) => {},
    fetchLocation: () => {}
});