import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';
import { GradientProvider } from './src/context/GradientContext';


const AppState = ({ children }: any ) => {
  return (
    <AuthProvider>
      <GradientProvider>
        { children }
      </GradientProvider>
    </AuthProvider>

  )
}


const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}


export default App;
