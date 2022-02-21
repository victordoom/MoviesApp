import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../context/AuthContext';

import { LoginScreen } from '../screens/LoginScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Tabs } from './TabNavigator';
import { Movie } from '../interfaces/movieInterface';

export type RootStackParams = {
  LoginScreen: undefined;
  Tabs: undefined;
  DetailScreen: Movie;
  HomeScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {

  const { status } = useContext( AuthContext );

  if ( status === 'checking' ) return <LoadingScreen />

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >

      {
        (status !== 'authenticated') 
          ? (
            <>
              <Stack.Screen name="LoginScreen" component={ LoginScreen } />
            </>
          )
          : (
            <Stack.Screen name="Tabs" component={ Tabs } options={{ headerShown: false}} />
          )
      }

    </Stack.Navigator>
  );
}