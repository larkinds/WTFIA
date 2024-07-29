import { createContext } from 'react';
import { LocationObject } from 'expo-location';

export type LocationInfo = {
  locationObject: LocationObject,
  error: string
}

export type GeographicInfo = {
  neighborhood: string,
  region: {
      latitude: number,
      longitude: number,
      latitudeDelta: number,
      longitudeDelta: number,
    },
    error: string
}


type LocationContextType = {
    location: GeographicInfo | null,
    setCurrentLocation: (location: GeographicInfo) => void,
    fetchLocation: () => void
}

export const LocationContext = createContext<LocationContextType>({
    location: null,
    setCurrentLocation: (location: GeographicInfo ) => {},
    fetchLocation: () => {}
});