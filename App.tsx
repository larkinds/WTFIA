import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { GeographicInfo, LocationContext, LocationInfo } from './context/LocationContext';
import LocationScreen from './screens/LocationScreen';
import SearchScreen from './screens/SearchScreen'
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  let latitude = Math.floor(Math.random() * (90 - -90 + 1) + -90);
  let longitude = Math.floor(Math.random() * (180 - -180 + 1) + -180);
  const [coords, setCoords] = useState<LocationObjectCoords | null>(null)
  const [currentLocation, setCurrentLocation] = useState< GeographicInfo | string>( "empty" );
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [region, setRegion] = useState({
    latitude,
    longitude,
    latitudeDelta: 130,
    longitudeDelta: 130,
  });
  const [error, setError] = useState("");

  async function fetchLocation() {
    setNeighborhood("");
    let randomStr = (Math.random() * 1000000).toString();
    setCurrentLocation(randomStr);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      //handle setting the error
      setCurrentLocation({
        neighborhood: "",
        region,
        error: "Device Locations Permission not Granted"
      })
      
      //either have the user give permissions or search by address
      return;
    };

    let locationObj = await Location.getCurrentPositionAsync()
    setCoords(locationObj.coords);
    
  };


  useEffect(() => {
    (async () => {
      if (typeof currentLocation !== "string" && currentLocation.neighborhood !== "error") {
        setNeighborhood(currentLocation.neighborhood);
        setRegion(currentLocation.region);
        setError("");
        return;
      } else if (typeof currentLocation !== "string" && currentLocation.neighborhood === "error") {
        setNeighborhood(currentLocation.neighborhood);
        setRegion(currentLocation.region);
        setError(currentLocation.error);
        return;
      }

      //find out if these can be removed
      // let latitude: number;
      // let longitude: number;

      if (coords && coords.latitude && coords.longitude) {
        latitude = coords.latitude;
        longitude = coords.longitude;

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
              setError("");
            } else {
              //adjust logging here
              throw new Error();
            }
          })
          .catch((error) => {
            //add error to location
            setNeighborhood("");
            setError(error.message);
          });
      }

    })();
  }, [currentLocation, coords]);

  return (
    <LocationContext.Provider value={{ location: {neighborhood, region, error}, setCurrentLocation, fetchLocation }}>
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
