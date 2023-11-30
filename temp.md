<!-- 
mapbox version, not workign
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoibGFya2luZHNtaXRoIiwiYSI6ImNsODU4azc3bjBtcHozcXFpY3RkeDc1dmkifQ.OsOOV28AcRKaW3qCODYt-A');

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Test!</Text>
      <Mapbox.MapView style={styles.map} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1
  }
}); -->


import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import MapView from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Geocoder from 'react-native-geocoding';
import Countdown from './components/Countdown';

export default function App() {
  let [locationSearched, setLocationSearched] = useState(false);
  let [errorMessage, setErrorMessage] = useState<string | null>(null);
  let [currentLocation, setCurrentLocation] = useState<LocationObject | null>(
    null
  );
  let [neighborhood, setNeighborhood] = useState<string>('');
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
        setRegion({ latitude, longitude, latitudeDelta: 0.05,
        longitudeDelta: 0.05 });

        const apiKey = '';
        Geocoder.init(apiKey);

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

  function handleClick() {
    fetchLocation();
    setLocationSearched(true);
  }

  async function refreshLocation() {
    Location.getCurrentPositionAsync().then((location) =>
      setCurrentLocation(location)
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        mapType="mutedStandard"
        showsUserLocation={true}
        region={region}
      />
      {errorMessage ? (
        <View style={[styles.locationsDisabledView, styles.viewOnMap]}>
          <Text>
            You chose not to give WTFAI access to your location data.{' '}
          </Text>
          <Text>
            If you'd still like to find out Where The Fuck You Are, navigate
            over to one of the Explore tabs.
          </Text>
          <View style={[styles.retryPermissionsView, styles.viewOnMap]}>
            <Text>Or, grant access now:</Text>
            <Button
              onPress={fetchLocation}
              title="Share Your Location"
            ></Button>
          </View>
        </View>
      ) : (
        <></>
      )}
      <View style={[styles.locationsEnabledView, styles.viewOnMap]}>
        {!locationSearched ? (
          <Button onPress={handleClick} title="Where the Fuck Am I?" />
        ) : neighborhood.length == 0 ? (
          <Countdown />
        ) : (
          <View>
            <Text>You are in {neighborhood}</Text>
            <Button onPress={refreshLocation} title="New Search" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewOnMap: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'purple',
    marginBottom: 70,
    borderRadius: 10,
    width: 'auto',
    height: '15%',
    padding: '5%',
  },
  locationsDisabledView: {
    display: 'flex',
    alignItems: 'center',
  },
  locationsEnabledView: {
    height: 'auto',
  },
  retryPermissionsView: {
    display: 'flex',
    fontSize: 14,
    margin: 4,
  },
});


{errorMessage ? (
        <View style={[styles.locationsDisabledView, styles.viewOnMap]}>
          <Text>
            You chose not to give WTFAI access to your location data.{' '}
          </Text>
          <Text>
            If you'd still like to find out Where The Fuck You Are, navigate
            over to one of the Explore tabs.
          </Text>
          <View style={[styles.retryPermissionsView, styles.viewOnMap]}>
            <Text>Or, grant access now:</Text>
            <Button
              onPress={fetchLocation}
              title="Share Your Location"
            ></Button>
          </View>
        </View>
      ) : (
        <></>
      )}