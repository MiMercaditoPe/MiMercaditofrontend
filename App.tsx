import React, { useState } from 'react';
import {  View,  Text,  StyleSheet, TextInput, Image,} from 'react-native';

const styleSheet = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#E53935',
    padding: 24,
  },
    logo: {
    padding: 10,
    marginTop: 100,
    alignSelf: 'center',
    width: 280,
    height: 175,
  },
  title: {
    marginTop: 40,
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#ffffffff',
  },
  form: {
    flexDirection: 'row', // para que el "S/." quede al lado del campo
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  prefix: {
    fontSize: 18,
    color: '#F5E6CC',
    marginRight: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '70%',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#27AE60',
    borderRadius: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#2C3E50',
  },
});

export default function ListP() {
  const [presupuesto, setPresupuesto] = useState('');

  return (
    <View style={styleSheet.container}>
    <Image source={require('./assets/MMP(L).png')} style={styleSheet.logo} />
    <Image source={require('./assets/fondo1.png')}/>
      <Text style={styleSheet.title}>Presupuesto</Text>

      <View style={styleSheet.form}>
        <Text style={styleSheet.prefix}>S/.</Text>
        <TextInput
          placeholder="0.00"
          style={styleSheet.input}
          value={presupuesto}
          onChangeText={(text) => {
            // Permitir solo números y un punto decimal opcional
            const numericValue = text.replace(/[^0-9.]/g, '');
            setPresupuesto(numericValue);
          }}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
}
