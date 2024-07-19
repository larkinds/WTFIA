import { useContext, Suspense, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Keyboard } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { LocationContext } from '../context/LocationContext';

export default function SearchScreen({ navigation }: any) {
  const [address, onChangeText] = useState('');
  const { setCurrentLocation } = useContext(LocationContext);

  async function handleClick() {
    Keyboard.dismiss();
      //to do: figure out if this init can be done conditionally
    const geocoderKey: string = process.env.EXPO_PUBLIC_GEOCODER_KEY || '';
    Geocoder.init(geocoderKey);


    let latitude: number | undefined;
    let longitude: number | undefined;
    let neighborhood: string | undefined;

    await Geocoder.from(address).then((json) => {
      let geometry = json.results[0].geometry;
      latitude = geometry.bounds?.northeast.lat || geometry.location.lat;
      longitude = geometry.bounds?.northeast.lng || geometry.location.lng;

      const addressComponent = json.results[0].address_components;

      neighborhood = addressComponent.find((component) => component.types.includes('neighborhood') || component.types.includes("locality")
      )?.long_name;

      console.log({neighborhood})


      if (latitude && longitude && neighborhood !== undefined) {
        
        setCurrentLocation(
          {
            neighborhood,
            region: {
              latitude,
              longitude,
              latitudeDelta: .05,
              longitudeDelta: .05,
            }
          }
        )
      }

    });

    navigation.navigate('Location');
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'black',
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
          flex: 0.3,
        }}
      >
        <TextInput
          editable
          returnKeyType='search'
          numberOfLines={1}
          maxLength={40}
          onSubmitEditing={() => handleClick()}
          onChangeText={(text) => onChangeText(text)}
          value={address}
          style={{ padding: 10, backgroundColor: "white" }}
        />
      </View>
      <Button title="Search" onPress={handleClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
