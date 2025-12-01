// Screens/Lista.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Producto {
  id: string;
  nombre: string;
  cantidad: string;
  prioridad: 'alta' | 'media' | 'baja';
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E53935' },

  // Parte de arriba
  ola: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 200,
    resizeMode: 'stretch',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  backArrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F3902B',
  },
  logo: {
    width: 800,
    height: 110,
    alignSelf: 'center',
    marginTop: 55,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    zIndex: 5,
  },

  // Parte de datos
  title: { marginTop: 210, alignSelf: 'center', fontSize: 26, fontWeight: 'bold', color: '#FFFFFF' },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 20, paddingHorizontal: 40
  },
  prefix: { fontSize: 22, color: '#F5E6CC', marginRight: 10, fontWeight: 'bold' },
  input: {
    flex: 1, backgroundColor: '#FFFFFF', borderWidth: 3, borderColor: '#27AE60',
    borderRadius: 30, paddingHorizontal: 16, paddingVertical: 14, fontSize: 18,
    color: '#2C3E50', textAlign: 'center'
  },

  listaContainer: { marginTop: 40, paddingHorizontal: 24, flex: 1 },
  listaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  listaTitle: { fontSize: 26, color: '#FFFFFF', fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#27AE60', width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center'
  },
  addText: { fontSize: 28, color: '#FFFFFF', fontWeight: 'bold' },

  // Inputs fila
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 10 },
  inputField: {
    flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 12,
    paddingVertical: 10, fontSize: 16, borderWidth: 1, borderColor: '#DDD'
  },
  cantidadInput: { width: 50, textAlign: 'center' },

  pickerContainer: {
    flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1,
    borderColor: '#DDD', overflow: 'hidden'
  },
  picker: { fontSize: 5, height: 50, color: '#2C3E50' },

  productoItem: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 2, borderColor: '#27AE60'
  },

  productoInfo: { flex: 1, marginLeft: 10 },
  productoNombre: { fontSize: 15, fontWeight: '600', color: '#2C3E50' },
  productoDetalle: { fontSize: 13, color: '#7F8C8D' },

  prioridadText: { fontSize: 18, marginHorizontal: 8 },
  deleteButton: { padding: 6 },

  calcularButton: {
    backgroundColor: '#F3902B', marginHorizontal: 40, marginVertical: 30,
    paddingVertical: 16, borderRadius: 30, alignItems: 'center'
  },
  calcularText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});

export default function ListP() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const userDistrict = route.params?.userDistrict || "Miraflores";

  const [presupuesto, setPresupuesto] = useState('');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaCantidad, setNuevaCantidad] = useState('1');
  const [nuevaPrioridad, setNuevaPrioridad] = useState<'alta' | 'media' | 'baja'>('media');

  const agregarProducto = () => {
    if (!nuevoNombre.trim()) return Alert.alert("Error", "Ingresa el nombre del producto");
    if (isNaN(Number(nuevaCantidad)) || Number(nuevaCantidad) <= 0)
      return Alert.alert("Error", "Cantidad inválida");

    setProductos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        nombre: nuevoNombre.trim(),
        cantidad: nuevaCantidad,
        prioridad: nuevaPrioridad,
      }
    ]);

    setNuevoNombre('');
    setNuevaCantidad('1');
    setNuevaPrioridad('media');
  };

  const eliminarProducto = (id: string) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  const renderProducto = ({ item }: { item: Producto }) => (
    <View style={styles.productoItem}>
      <View style={styles.productoInfo}>
        <Text style={styles.productoNombre}>Producto: {item.nombre}</Text>
        <Text style={styles.productoDetalle}>Cant: {item.cantidad} — Prioridad: {item.prioridad}</Text>
      </View>
      <Text style={styles.prioridadText}>
      {item.prioridad === 'alta'
        ? '★'
        : item.prioridad === 'media'
        ? '⭑'
        : '☆'}
    </Text>
      <TouchableOpacity onPress={() => eliminarProducto(item.id)} style={styles.deleteButton}>
        <Text style={{ fontSize: 24, color: '#E53935' }}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const calcular = () => {
    if (!presupuesto || productos.length === 0) {
      Alert.alert("Error", "Completa presupuesto y al menos un producto");
      return;
    }

    navigation.navigate('Search', {
      userDistrict,
      presupuesto: parseFloat(presupuesto),
      productos
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/fondo2.png')} style={styles.ola} />
      <Image source={require('../assets/MMP(L).png')} style={styles.logo} />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>❮</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Presupuesto</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.prefix}>S/.</Text>
        <TextInput
          style={styles.input}
          value={presupuesto}
          onChangeText={setPresupuesto}
          keyboardType="numeric"
          placeholder="0.00"
        />
      </View>

      <View style={styles.listaContainer}>
        <View style={styles.listaHeader}>
          <Text style={styles.listaTitle}>Lista</Text>
          <TouchableOpacity style={styles.addButton} onPress={agregarProducto}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Producto"
            style={styles.inputField}
            value={nuevoNombre}
            onChangeText={setNuevoNombre}
          />

          <TextInput
            placeholder="Cant."
            style={[styles.inputField, styles.cantidadInput]}
            value={nuevaCantidad}
            onChangeText={setNuevaCantidad}
            keyboardType="numeric"
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={nuevaPrioridad}
              onValueChange={setNuevaPrioridad}
              style={styles.picker}
            >
              <Picker.Item label="Prioridad" value="" />
              <Picker.Item label="Alta" value="alta" />
              <Picker.Item label="Media" value="media" />
              <Picker.Item label="Baja" value="baja" />
            </Picker>
          </View>
        </View>

        <FlatList
          data={productos}
          renderItem={renderProducto}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#FFF', marginTop: 20, fontStyle: 'italic' }}>
              Agrega productos con +
            </Text>
          }
        />
      </View>

      <TouchableOpacity style={styles.calcularButton} onPress={calcular}>
        <Text style={styles.calcularText}>Calcular</Text>
      </TouchableOpacity>
    </View>
  );
}
