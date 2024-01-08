import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function Countdown(props: any) {
    let [count, setCount] = useState(10);

    useEffect(() => {
      setTimeout(() => {
        if (count >= 1) {
            setCount(count => count- 1)
          }
    }, 1000)
    }, [count])
   
  return (
    <View style={{justifyContent: "center", marginTop: "50%"}}>
      <Text style={{backgroundColor: "#bce3f4", color: "black", fontSize: 20, padding: 3}}>The neighborhood will be available in:</Text>
      <Text style={{color: "black", fontSize: 50, marginLeft: "50%"}}>{count}</Text>
    </View>
  );
}