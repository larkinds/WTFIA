import MapView from 'react-native-maps';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Countdown from '../components/Countdown';
import { LocationContext } from '../context/LocationContext';

type LocationScreenProps = {
  route: {
    params: {
      errorMessage: string;
    neighborhood: string;
    region: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
  };
};
}

export default function LocationScreen( ) {
  const {neighborhood, region, fetchLocation} = useContext(LocationContext);
  console.log({neighborhood})
  console.log({region})


  async function refreshLocation() {
    fetchLocation();
  }

  return (
    <View style={styles.container}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            mapType="mutedStandard"
            showsUserLocation={true}
            region={region}
          />
          <View style={[styles.locationsEnabledView, styles.viewOnMap]}>
            {neighborhood === '' ? (
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
