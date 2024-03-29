import { useContext, Suspense, useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { LocationContext } from '../context/LocationContext';
import Geocoder from 'react-native-geocoding';

export default function HomeScreen({ navigation }: any) {
  const [address, onChangeText] = useState('397 Bridge St, Brooklyn NY');
  const { setCurrentLocation } = useContext(LocationContext);

  function handleClick() {
      //to do: figure out if this init can be done conditionally
    const geocoderKey: string = process.env.EXPO_PUBLIC_GEOCODER_KEY || '';
    Geocoder.init(geocoderKey);


    Geocoder.from(address).then((json) => {
      console.log(json.results);

      const addressComponent = json.results[0].address_components;

      const neighborhood = addressComponent.find((component) =>
        component.types.includes('neighborhood')
      );

    //   to do: massage the location information above into a Location Object
    //https://docs.expo.dev/versions/latest/sdk/location/#locationobject
    //   setCurrentLocation()

    });

    navigation.navigate('Location');
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
          flex: 0.3,
        }}
      >
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          onChangeText={(text) => onChangeText(text)}
          value={address}
          style={{ padding: 10 }}
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
