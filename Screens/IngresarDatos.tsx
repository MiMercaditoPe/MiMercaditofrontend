import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  IngresarDatos: undefined;
  Lista: undefined;
  Search: undefined;
  Result: undefined;
};
type IngresarDatosNavProp = NativeStackNavigationProp<RootStackParamList, 'IngresarDatos'>;

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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default function IngresarD() {
  // Estados
  const [name, setName] = useState('');
  const [familyMembers, setFamilyMembers] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const distritos = [
    'La Molina',
    'Surco',
    'Miraflores',
    'San Isidro',
    'Barranco',
    'Pueblo Libre',
  ];

  // Función handleSubmit
  const handleSubmit = async () => {
    if (!name || !familyMembers || !location) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Aquí iría la lógica para guardar en Supabase o backend
      console.log({ name, familyMembers, location });

      Alert.alert('Datos guardados', `Bienvenid@ ${name} de ${location}`);
      // router.push('/budget'); ← cuando uses navegación
    } catch (err) {
      console.error(err);
      setError('Error al guardar los datos. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const navigation = useNavigation<IngresarDatosNavProp>();
  
  return (
    <View style={styleSheet.container}>
      <Image source={require('../assets/MMP.png')} style={styleSheet.logo} />
      <Text style={styleSheet.title}>Ingresa tus datos</Text>

      <View style={styleSheet.form}>
        <TextInput
          placeholder="Nombre del jefe de familia"
          style={styleSheet.input}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styleSheet.form}>
        <TextInput
          placeholder="Número de miembros de familia"
          style={styleSheet.input}
          keyboardType="numeric"
          value={familyMembers}
          onChangeText={setFamilyMembers}
        />
      </View>

      <View style={styleSheet.form}>
        <View style={styleSheet.pickerContainer}>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => setLocation(itemValue)}
            style={styleSheet.picker}
          >
            <Picker.Item label="Selecciona tu distrito" value="" />
            {distritos.map((d, i) => (
              <Picker.Item key={i} label={d} value={d} />
            ))}
          </Picker>
        </View>
      </View>

      {error ? <Text style={styleSheet.errorText}>{error}</Text> : null}

      <TouchableOpacity
         style={styleSheet.primaryButton}
          onPress={() => {
          if (!name || !familyMembers || !location) {
          setError("Por favor completa todos los campos");
          return;
             }
    handleSubmit();
    navigation.navigate("Lista");
  }}
  disabled={loading}
      >
        <Text style={styleSheet.buttonText}>
          {loading ? 'Guardando...' : 'Siguiente'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
