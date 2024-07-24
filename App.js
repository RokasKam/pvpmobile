import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {theme} from './src/utils/theme';
import {UserContext} from './src/contexts/UserContext';
import {
  StartScreen,
  LoginScreen,
  MainScreen,
  QuizScreen,
  ChangePasswordScreen,
  ProfileScreen,
  AvatarScreen,
} from './src/screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserContext>
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="QuizScreen" component={QuizScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen
              name="ChangePasswordScreen"
              component={ChangePasswordScreen}
            />
            <Stack.Screen name="AvatarScreen" component={AvatarScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </UserContext>
  );
};

export default App;
