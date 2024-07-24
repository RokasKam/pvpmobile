import React, {useRef, useEffect} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';

const Avatar = ({image, style}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const moveAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 16,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(rotate, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(rotate, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    moveAnimation.start();

    return () => {
      moveAnimation.stop();
    };
  }, [translateY, rotate]);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '10deg'],
  });

  return (
    <Animated.Image
      source={{uri: `${image}`}}
      style={StyleSheet.flatten([
        styles.image,
        style,
        {
          transform: [{translateY}, {rotate: rotation}],
        },
      ])}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
});
