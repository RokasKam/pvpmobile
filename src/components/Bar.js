import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Bar as ProgressBar} from 'react-native-progress';
import {theme} from '../utils/theme';

const Bar = ({
  progress,
  currentQuestion,
  totalQuestions,
  barHeight = 30,
  animationType = 'spring',
  useNativeDriver = true,
  borderRadius = 10,
}) => {
  return (
    <View style={styles.progressBarContainer}>
      <ProgressBar
        progress={progress}
        width={null}
        height={barHeight}
        color={'#4392b9'}
        borderWidth={2}
        useNativeDriver={useNativeDriver}
        animationType={animationType}
        borderColor={theme.colors.primary}
      />
      <Text style={styles.progressText}>
        Klausimas {currentQuestion + 1}/{totalQuestions}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    padding: 10,
    paddingBottom: 20,
    width: '80%',
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    top: '50%',
    transform: [{translateX: 10}],
    color: '#1e3a4d',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Bar;
