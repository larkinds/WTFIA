import { LocationObject } from 'expo-location';
import { SetStateAction, createContext } from 'react';

export const LocationContext = createContext({
    neighborhood: "",
    region: {
        latitude: 0,
      longitude: 0,
      latitudeDelta: .3,
      longitudeDelta: .3,
    },
    setCurrentLocation: (location: LocationObject) => {},
    fetchLocation: () => console.log("initialFetch")
});