import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainLayout from './layout/MainLayout';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import setConfig from './api/config';


export default function App() {
  React.useEffect(() => {
    setConfig();
  }, []);

  return (
    <SafeAreaProvider initialRouteName="Home">
      <NavigationContainer theme={navigatorTheme}>
        <MainLayout />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#293648',
    secondary: '#0077FF',
    white: '#ffffff',
    background: '#ffffff'
  },
};
