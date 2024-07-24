import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableRipple, Text} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import {theme} from '../utils/theme';

const GradientButton = ({mode, style, children, ...props}) => {
  if (mode === 'outlined') {
    return (
      <View style={styles.shadowContainer}>
        <LinearGradient
          colors={['#4392b9', '#1e3a4d']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientBorder}>
          <View style={styles.buttonContainer}>
            <TouchableRipple
              style={[styles.button, styles.outlinedButton, style]}
              {...props}
              rippleColor="rgba(0, 0, 0, .32)">
              <View style={styles.content}>
                <Text style={styles.outlinedText}>{children}</Text>
              </View>
            </TouchableRipple>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.shadowContainer}>
      <LinearGradient
        colors={['#4392b9', '#1e3a4d']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradient}>
        <TouchableRipple
          style={[styles.button, style]}
          {...props}
          rippleColor="rgba(255, 255, 255, .32)">
          <View style={styles.content}>
            <Text style={styles.text}>{children}</Text>
          </View>
        </TouchableRipple>
      </LinearGradient>
    </View>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  shadowContainer: {
    width: '100%',
    marginVertical: 10,
    borderRadius: theme.borderRadius.medium,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  gradient: {
    borderRadius: theme.borderRadius.medium,
    width: '100%',
  },
  gradientBorder: {
    borderRadius: theme.borderRadius.medium,
    padding: 2,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    width: '100%',
  },
  button: {
    width: '100%',
    borderRadius: theme.borderRadius.medium,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  outlinedButton: {
    borderWidth: 2,
    borderColor: 'transparent',
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFF',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  outlinedText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#1e3a4d',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});
