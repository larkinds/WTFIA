import { useContext, Suspense } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Canvas } from '@react-three/fiber';
import Globe from '../components/Globe';
import QuestionMarkStar from '../components/QuestionMarkStar';
import { LocationContext } from '../context/LocationContext';


export default function HomeScreen({ navigation }: any) {
    const { fetchLocation } = useContext(LocationContext);
  
    function handleClick() {
      fetchLocation();
      navigation.navigate('Location');
    }

    function navigateToSearch() {
      navigation.navigate('Search');
    }
  
    return (
      <View style={styles.container}>
        <QuestionMarkStar
          duration={5000}
          color="white"
          left={20}
          top={10}
        />
        <QuestionMarkStar
          duration={2000}
          color="white"
          left={25}
          top={20}
        />
        <QuestionMarkStar duration={2000} color="white" left={32} top={2} />
        <QuestionMarkStar
          duration={2000}
          color="white"
          left={32}
          top={25}
        />
          <Text style={styles.title}>Where the Fuck Am I?</Text>
        <View style={styles.canvas}>
          <Suspense fallback={<Text>Temp</Text>}>
            <Canvas>
              <ambientLight />
              <Globe />
            </Canvas>
          </Suspense>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Locate Me"
            color="white"
            onPress={() => handleClick()}
          />
          <Button
            title="Search by Address"
            color="white"
            onPress={() => navigateToSearch()}
          />
        </View>
        <QuestionMarkStar
          duration={2000}
          color="white"
          left={40}
          top={20}
        />
        <QuestionMarkStar duration={5000} color="red" left={20} top={10} />
        <QuestionMarkStar
          duration={5000}
          color="white"
          left={20}
          top={10}
        />
        <QuestionMarkStar
          duration={2000}
          color="white"
          left={25}
          top={7}
        />
        <QuestionMarkStar duration={2000} color="white" left={32} top={0} />
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
    title: {
      borderWidth: 1,
      marginTop: 100,
      borderRadius: 3,
      backgroundColor: "black",
      color: "white",
      borderColor: 'white',
      padding: 7,
      shadowColor: 'white',
      shadowOpacity: 1,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowRadius: 2,
      fontSize: 20,
    },
    canvas: {
      height: 600,
      width: 600,
      marginTop: -100,
    },
    buttonContainer: {
      justifyContent: "space-around",
      marginTop: -80,
     
    },
    buttons: {
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: "black",
      borderColor: 'white',
      padding: 2,
      shadowColor: 'white',
      shadowOpacity: 1,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowRadius: 2,
      fontSize: 20,
    }
  });