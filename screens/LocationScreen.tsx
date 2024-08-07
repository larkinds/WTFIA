import MapView from 'react-native-maps';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { LocationContext } from '../context/LocationContext';
import Countdown from '../components/Countdown';
import RefreshButton from '../components/RefreshButton';

export default function LocationScreen() {
  const { location, fetchLocation } = useContext(LocationContext);
  const [reloading, setReloading] = useState(false);

  function refreshLocation() {
    setReloading(true);
    fetchLocation();

    setTimeout(() => {
      setReloading(false);
    }, 11100);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        mapType="mutedStandard"
        showsUserLocation={true}
        region={location?.region}
      />
      <View>
        {location?.error !== '' ? (
          <View style={styles.locationVisibleView}>
            <Text style={{
                  color: 'black',
                  fontSize: 20,
                  marginLeft: 5,
                  marginRight: 5,
                }}>Whoops! Let's Try that Again</Text>
                <RefreshButton onPressFunction={refreshLocation} />
          </View>
        ) : location?.neighborhood === '' ? (
          reloading ? (
            <ActivityIndicator
              style={styles.activityIndicator}
              size="large"
              color="black"
            />
          ) : (
            <Countdown />
          )
        ) : (
          <>
            <View style={styles.locationVisibleView}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  marginLeft: 5,
                  marginRight: 5,
                }}
              >
                {location?.neighborhood}{' '}
              </Text>
              <RefreshButton onPressFunction={refreshLocation} />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  // locationsDisabledView: {
  //   display: 'flex',
  //   alignItems: 'center',
  // },
  // retryPermissionsView: {
  //   flex: 1,
  //   fontSize: 14,
  //   margin: 4,
  // },
  activityIndicator: {
    backgroundColor: '#FDF1D9',
    top: 430,
    padding: 10,
  },
  locationVisibleView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: '#E1E0DB',
    top: 200,
    padding: 2,
    paddingBottom: 8,
  },
});
