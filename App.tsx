import React, { useState } from 'react';
import {View,  Text,  StyleSheet,  Image,  Alert,  TextInput,  TouchableOpacity,} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#8E9775',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  input: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#27AE60',
    borderRadius: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#2C3E50',
    marginTop: 10,
    marginBottom: 5,
  },
  pickerContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#27AE60',
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    color: '#2C3E50',
  },
  primaryButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default function App() {
  const [ubicacion, setUbicacion] = useState('');

  const distritos = [
    'La Molina',
    'Surco',
    'Miraflores',
    'San Isidro',
    'Barranco',
    'Pueblo Libre',
  ];

  return (
    <View style={styleSheet.container}>
      <Image source={require('./assets/MMP.png')} style={styleSheet.logo} />
      <Text style={styleSheet.title}>Ingresa tus datos</Text>

      {/* Nombre */}
      <View style={styleSheet.form}>
        <TextInput placeholder="Nombre del jefe de familia" style={styleSheet.input} />
      </View>

      {/* Número de miembros */}
      <View style={styleSheet.form}>
        <TextInput
          placeholder="Número de miembros de familia"
          style={styleSheet.input}
          keyboardType="numeric"
        />
      </View>

      {/* Ubicación con Picker */}
      <View style={styleSheet.form}>
        <View style={styleSheet.pickerContainer}>
          <Picker
            selectedValue={ubicacion}
            onValueChange={(itemValue) => setUbicacion(itemValue)}
            style={styleSheet.picker}
          >
            <Picker.Item label="Selecciona tu distrito" value="" />
            {distritos.map((d, i) => (
              <Picker.Item key={i} label={d} value={d} />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={styleSheet.primaryButton}
        onPress={() => {
          if (!ubicacion) {
            Alert.alert('Por favor selecciona una ubicación');
          } else {
            Alert.alert(`Distrito seleccionado: ${ubicacion}`);
          }
        }}
      >
        <Text style={styleSheet.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}
