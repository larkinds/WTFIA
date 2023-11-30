import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

export default function Countdown(props: any) {
    let [count, setCount] = useState(9);

    useEffect(() => {
      setTimeout(() => {
        if (count >= 1) {
            setCount(count => count- 1)
          }
    }, 1000)
    }, [count])
   
  return (
    <>
      <Text>The neighborhood will be available in {count} </Text>
    </>
  );
}