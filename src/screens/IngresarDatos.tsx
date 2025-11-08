import React, { useState } from 'react';
import {View,  Text,  StyleSheet,  Image,  KeyboardAvoidingView, Platform, Alert,TextInput, TouchableOpacity,Button} from 'react-native';

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
    height: 175 },
  title: {
    marginTop: 40,
    alignSelf: 'center',
    fontSize:18,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '8E9775'
  },
  form: {
    alignItems:'center',
    justifyContent: 'center',
    gap: 100, 
  },
  input: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#27AE60',
    borderRadius: 12,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#2C3E50',
    marginTop: 10,
    marginBottom: 5,
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

export default function App(){
return ( <View style={styleSheet.container}> 
   <Image
        source={require('./assets/MMP.png')}
        style={styleSheet.logo}
      />
  <Text style={styleSheet.title}>Ingresa tus datos</Text>
  <View style={styleSheet.form}>
    <TextInput placeholder='Nombre' style={styleSheet.input}/>
  </View>
  <View style={styleSheet.form}>
    <TextInput placeholder='Número de miembros de familia' style={styleSheet.input}/>
  </View>
  <View style={styleSheet.form}>
    <TextInput placeholder='Ubicacion' style={styleSheet.input}/>
  </View>
      <TouchableOpacity
        style={styleSheet.primaryButton}
        onPress={() => Alert.alert('Botón presionado')}
      >
        <Text style={styleSheet.buttonText}>Siguiente</Text>
      </TouchableOpacity>
</View>
);
}