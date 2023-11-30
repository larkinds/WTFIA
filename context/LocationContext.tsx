import { createContext } from 'react';

export const LocationContext = createContext({
    neighborhood: "",
    region: {
        latitude: 0,
      longitude: 0,
      latitudeDelta: .3,
      longitudeDelta: .3,
    },
    fetchLocation: () => console.log("initialFetch")
});