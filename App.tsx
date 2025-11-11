import React, { useState } from 'react';
import {View,  Text,  StyleSheet,  Image,  KeyboardAvoidingView, Platform, Alert,TextInput, TouchableOpacity,Button} from 'react-native';

const styleSheet = StyleSheet.create({
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
})
export default function ListP() {
  return(
    <View>
    <Text style={styleSheet.title}>Presupueto</Text>
    //contenedor de presupuesto
    <View style={styleSheet.form}>
            <TextInput
              placeholder="S/."
              style={styleSheet.input}
            />
          </View>



    </View>
  );
}