import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { GeographicInfo, LocationContext } from './context/LocationContext';
import LocationScreen from './screens/LocationScreen';
import SearchScreen from './screens/SearchScreen'
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationObject | GeographicInfo | null>(
    null
  );
  const [neighborhood, setNeighborhood] = useState<string>('');
  let latitude = Math.floor(Math.random() * (90 - -90 + 1) + -90);
  let longitude = Math.floor(Math.random() * (180 - -180 + 1) + -180);
  const [region, setRegion] = useState({
    latitude,
    longitude,
    latitudeDelta: 130,
    longitudeDelta: 130,
  });

  async function fetchLocation() {
    setNeighborhood("");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMessage(
        'You can still use WTFIA by entering your address manually on the Explore page.'
      );
      return;
    };
    let location: LocationObject = await Location.getCurrentPositionAsync();
 
    setCurrentLocation(location);
  };


  useEffect(() => {
    (async () => {
      if (currentLocation && "neighborhood" in currentLocation) {
        setNeighborhood(currentLocation.neighborhood);
        setRegion(currentLocation.region);
        return
      }

      let latitude: number;
      let longitude: number;

      if (currentLocation && "coords" in currentLocation && currentLocation.coords && currentLocation.coords.latitude && currentLocation.coords.longitude) {
        latitude = currentLocation?.coords.latitude;
        longitude = currentLocation?.coords.longitude;
        let tempRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };

        setRegion(tempRegion);

        const geocoderKey: string = process.env.EXPO_PUBLIC_GEOCODER_KEY || "";

        Geocoder.init(geocoderKey);

        Geocoder.from(latitude, longitude)
          .then((json) => {
            const addressComponent = json.results[0].address_components;

            const neighborhood = addressComponent.find((component) =>
              component.types.includes('neighborhood') || component.types.includes("locality")
            );

            if (neighborhood) {
              const neighborhoodName = neighborhood.long_name;
              setNeighborhood(neighborhoodName);
            } else {
              console.log(
                'Neighborhood information not found in the response.'
              );
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    })();
  }, [currentLocation]);

  return (
    <LocationContext.Provider value={{ neighborhood, region, setCurrentLocation, fetchLocation }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTransparent: true}}>
          <Stack.Screen name="Home" component={HomeScreen} options={{title: ""}} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationContext.Provider>
  );
}
