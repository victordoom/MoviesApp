import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigatorMovies } from './NavigationMovies';
import { SearchScreen } from '../screens/SearchScreen';


const Tab = createBottomTabNavigator();



export const Tabs = () => {
  return (
    <Tab.Navigator
        sceneContainerStyle={{
            backgroundColor: 'white'
        }}
        screenOptions={{
            headerShown: false
        }}
        
    >
      <Tab.Screen 
        name="NavigatorMovies" 
        component={ NavigatorMovies }
        options={{
            tabBarLabel: "List",
            tabBarIcon: ({ color }) => (
                <Icon 
                    color={ color } 
                    size={ 25 } 
                    name="list-outline"
                />
            )
        }}
      />
      <Tab.Screen 
        name="SearchScreen" 
        component={ SearchScreen } 
        options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color }) => (
                <Icon 
                    color={ color } 
                    size={ 25 } 
                    name="search-outline"
                />
            )
        }}
    />
    </Tab.Navigator>
  );
}