import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Avatar from './Avatar';

const Leaderboard = ({leaderboardScore}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={[styles.headerText, styles.nameText]}>Vardas</Text>
          <Text style={styles.headerText}>Taškai</Text>
        </View>
        {leaderboardScore.map((score, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.nameContainer}>
              <Avatar image={score.avatarImage} style={styles.avatarImage} />
              <Text style={[styles.cell, styles.nameText]}>{score.name}</Text>
            </View>
            <Text style={styles.cell}>{score.score}</Text>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#60cc9b',
    borderRadius: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
  headerRow: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#3c867f',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#4392b9',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e3a4d',
    fontFamily: 'ChalkboardSE-Regular',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#1e3a4d',
    fontFamily: 'ChalkboardSE-Regular',
  },
  nameText: {
    textAlign: 'left',
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default Leaderboard;
