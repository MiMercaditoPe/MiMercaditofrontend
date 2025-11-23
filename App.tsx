import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IngresarD from './Screens/IngresarDatos';
import ListP from './Screens/Lista';
import Search from './Screens/Search';
import Result from './Screens/Result';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="IngresarD" component={IngresarD} />
        <Stack.Screen name="ListP" component={ListP} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
