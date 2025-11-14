import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IngresarDatos from './Screens/IngresarDatos';
import ListP from './Screens/Lista';
import Search from './Screens/Search';
import Result from './Screens/Result';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IngresarDatos" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="IngresarDatos" component={IngresarDatos} />
        <Stack.Screen name="Lista" component={ListP} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
