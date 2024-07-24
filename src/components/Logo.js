import React, {useRef, useEffect} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';

const Logo = () => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const moveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 10,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    moveAnimation.start();

    return () => {
      moveAnimation.stop();
    };
  }, [translateY]);

  return (
    <Animated.Image
      source={require('../assets/logo.png')}
      style={[styles.image, {transform: [{translateY}]}]}
    />
  );
};

export default Logo;

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    marginBottom: 16,
  },
});
