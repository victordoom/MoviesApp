import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';
import { GradientProvider } from './src/context/GradientContext';
import { LogBox } from 'react-native';

//Se ignora este warning ya que es debido a un paquete de tercero
//Y solo queria el uso del mismo
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
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
