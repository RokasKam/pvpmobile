import React, {useRef, useEffect} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';

const MoneyIcon = ({style}) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    scaleAnimation.start();

    return () => {
      scaleAnimation.stop();
    };
  }, [scale]);

  return (
    <Animated.Image
      source={require('../assets/coin.png')}
      style={[styles.image, {transform: [{scale}]}, style]}
    />
  );
};

export default MoneyIcon;

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
});
