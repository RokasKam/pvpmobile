import React from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';

const StartScreen = ({navigation}) => {
  return (
    <Background>
      <Logo />
      <Header>Sveikutis</Header>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}>
        Prisijungti
      </Button>
    </Background>
  );
};

export default StartScreen;
