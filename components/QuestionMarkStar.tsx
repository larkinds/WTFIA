import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';

export default function QuestionMarkStar(props: {duration: number, color: string, left: string, top: string} ) {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
      const animation = Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: props.duration / 2,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: props.duration / 2,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
  
  
      const loop = Animated.loop(animation)
      loop.start()
  
      return () => {
        loop.stop();
      };
  
    }, [fadeAnim]);
  
    const textColor = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 1)', props.color],
    });
    
  return (
    <Animated.Text style={{color: textColor, left: props.left, top: props.top}}>?</Animated.Text>
  );
}