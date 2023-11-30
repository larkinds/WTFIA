import React, { Suspense, useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Canvas } from '@react-three/fiber';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import Geocoder from 'react-native-geocoding';
import {GEOCODER_KEY} from "./utils/config"
import Globe from './components/Globe';
import QuestionMarkStar from './components/QuestionMarkStar';
import LocationScreen from './screens/LocationScreen';
import { LocationContext } from './context/LocationContext';

function HomeScreen({ navigation }) {
  const { fetchLocation } = useContext(LocationContext);

  function handleClick() {
    fetchLocation();
    navigation.navigate('Location');
  }

  return (
    <View style={styles.container}>
      <QuestionMarkStar
        duration={5000}
        color="white"
        left={'-20%'}
        top={'10%'}
      />
      <QuestionMarkStar
        duration={2000}
        color="white"
        left={'25%'}
        top={'20%'}
      />
      <QuestionMarkStar duration={2000} color="white" left={'32%'} top={'2%'} />
      <QuestionMarkStar
        duration={2000}
        color="white"
        left={'-32%'}
        top={'25%'}
      />
      <View style={styles.canvas}>
        <Suspense fallback={<Text>Temp</Text>}>
          <Canvas>
            <ambientLight />
            <Globe />
          </Canvas>
        </Suspense>
      </View>
      <View style={styles.button}>
        <Button
          title="Where the Fuck Am I?"
          color="red"
          onPress={() => handleClick()}
        />
      </View>
      <QuestionMarkStar
        duration={2000}
        color="white"
        left={'-40%'}
        top={'-20%'}
      />
      <QuestionMarkStar duration={5000} color="red" left={'20%'} top={'-10%'} />
      <QuestionMarkStar
        duration={5000}
        color="white"
        left={'-20%'}
        top={'10%'}
      />
      <QuestionMarkStar
        duration={2000}
        color="white"
        left={'-25%'}
        top={'-7%'}
      />
      <QuestionMarkStar duration={2000} color="white" left={'32%'} top={'0%'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  canvas: {
    height: 600,
    width: 600,
  },
  button: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'white',
    padding: 2,
    shadowColor: 'white',
    shadowOpacity: 1,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 2,
    fontSize: 20,
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(
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
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMessage(
        'You can still use WTFIA by entering your address manually on the Explore page.'
      );
      return;
    }
    let location: LocationObject = await Location.getCurrentPositionAsync();
    setCurrentLocation(location);
  }

  useEffect(() => {
    (async () => {
      let latitude: number;
      let longitude: number;

      if (currentLocation) {
        latitude = currentLocation?.coords.latitude;
        longitude = currentLocation?.coords.longitude;
        let tempRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        setRegion(tempRegion);

        const geocoderKey: string = process.env.EXPO_PUBLIC_GEOCODER_KEY

        Geocoder.init(geocoderKey);

        Geocoder.from(latitude, longitude)
          .then((json) => {
            const addressComponent = json.results[0].address_components;

            const neighborhood = addressComponent.find((component) =>
              component.types.includes('neighborhood')
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
    <LocationContext.Provider value={{ neighborhood, region, fetchLocation }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Location"
            component={LocationScreen}
            errorMessage={errorMessage}
            setCurrentLocation={setCurrentLocation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationContext.Provider>
  );
}
