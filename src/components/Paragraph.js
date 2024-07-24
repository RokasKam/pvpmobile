import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const Paragraph = ({style, ...props}) => {
  return <Text style={StyleSheet.flatten([styles.text, style])} {...props} />;
};

export default Paragraph;

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 16,
    color: '#1e3a4d',
  },
});
