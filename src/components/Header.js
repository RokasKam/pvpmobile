import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import {theme} from '../utils/theme';

const Header = props => {
  return (
    <View style={styles.container}>
      <MaskedView
        style={styles.maskedView}
        maskElement={
          <Text style={[styles.header, styles.hidden]} {...props}>
            {props.children}
          </Text>
        }>
        <LinearGradient
          colors={['#60cc9b', '#3c867f']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradient}
        />
      </MaskedView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: theme.roundness,
  },
  maskedView: {
    flexDirection: 'row',
    height: 40,
  },
  gradient: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  hidden: {
    backgroundColor: 'transparent',
  },
});
