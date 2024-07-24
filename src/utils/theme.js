import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#333333',
    primary: '#3c867f',
    secondary: '#FFB26B',
    error: '#c83951',
    background: '#F7F8FB',
    surface: '#FFFFFF',
    accent: '#4392b9',
    inputBackground: '#FFFFFF',
    placeholder: '#A0A0A0',
    disabled: '#E0E0E0',
  },
  roundness: 16,
  borderRadius: {
    small: 8,
    medium: 16,
    large: 24,
  },
};
