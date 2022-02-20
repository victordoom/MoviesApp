import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../context/AuthContext';

import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Movie } from '../interfaces/movieInterface';
import { DetailScreen } from '../screens/DetailScreen';

export type RootStackParams = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  DetailScreen: Movie;
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
            <>
            <Stack.Screen name="HomeScreen" component={ HomeScreen } />
            <Stack.Screen name="DetailScreen" component={ DetailScreen } />
            </>
          )
      }

    </Stack.Navigator>
  );
}