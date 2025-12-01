// Screens/IngresarDatos.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
    alignSelf: 'center',
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
export default function IngresarD() {
  const [name, setName] = useState('');
  const [familyMembers, setFamilyMembers] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<any>();

  const distritos = [
    "Miraflores", "Barranco", "Surco", "Santiago de Surco", "San Isidro", "San Borja", "Lince",
    "Jesús María", "San Miguel", "Callao", "Chorrillos", "Surquillo", "La Molina", "Pueblo Libre",
    "San Martín de Porres", "Comas", "Villa El Salvador", "San Juan de Lurigancho"
  ];

  const handleNext = () => {
    if (!name || !familyMembers || !location) {
      setError("Completa todos los campos");
      return;
    }
    // Guardamos distrito globalmente (usaremos en Lista y Result)
    navigation.navigate('ListP', { userDistrict: location });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/MMP.png')} style={styles.logo} />
      <Text style={styles.title}>Ingresa tus datos</Text>

      <TextInput placeholder="Nombre del jefe de familia" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Número de miembros" style={styles.input} value={familyMembers} onChangeText={setFamilyMembers} keyboardType="numeric" />

      <View style={styles.pickerContainer}>
        <Picker selectedValue={location} onValueChange={setLocation}>
          <Picker.Item label="Selecciona tu distrito" value="" />
          {distritos.map(d => <Picker.Item key={d} label={d} value={d} />)}
        </Picker>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}