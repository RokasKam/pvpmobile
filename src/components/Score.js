import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MoneyIcon from './MoneyIcon';

const Score = ({points}) => {
  const formattedPoints = points.toFixed(2);

  return (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>{formattedPoints}</Text>
      <MoneyIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    top: 25,
    width: '100%',
    zIndex: 1000,
  },
  scoreText: {
    color: '#60cc9b',
    fontSize: 32,
    marginRight: 12,
    fontWeight: 'bold',
  },
});

export default Score;
