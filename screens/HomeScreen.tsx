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
            color="white"
            onPress={() => handleClick()}
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
    canvas: {
      height: 600,
      width: 600,
    },
    button: {
      borderWidth: 1,
      borderRadius: 10,
      marginTop: -60,
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
    },
  });