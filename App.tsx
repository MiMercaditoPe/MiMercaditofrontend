import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // ← NUEVO

interface Producto {
  id: string;
  nombre: string;
  cantidad: string;
  prioridad: 'alta' | 'media' | 'baja';
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E53935' },
  ola: { position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: 200, resizeMode: 'stretch' },
  backButton: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  logo: { width: 800, height: 110, alignSelf: 'center', marginTop: 55, resizeMode: 'contain' },
  title: { marginTop: 40, alignSelf: 'center', fontSize: 26, fontWeight: 'bold', color: '#FFFFFF' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, paddingHorizontal: 40 },
  prefix: { fontSize: 22, color: '#F5E6CC', marginRight: 10, fontWeight: 'bold' },
  input: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 3, borderColor: '#27AE60', borderRadius: 30, paddingHorizontal: 16, paddingVertical: 14, fontSize: 18, color: '#2C3E50', textAlign: 'center' },
  listaContainer: { marginTop: 40, paddingHorizontal: 24, flex: 1 },
  listaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  listaTitle: { fontSize: 18, color: '#FFFFFF', fontWeight: '600' },
  addButton: { backgroundColor: '#27AE60', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  addText: { fontSize: 28, color: '#FFFFFF', fontWeight: 'bold' },

  // 3 CAMPOS DE ENTRADA
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 },
  inputField: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, borderWidth: 1, borderColor: '#DDD' },
  cantidadInput: { width: 80, textAlign: 'center' },

  // NUEVO: ESTILO DEL PICKER
  pickerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    overflow: 'hidden', // Importante en Android
  },
  picker: {
    fontSize: 5,
    height: 50,
    color: '#2C3E50',
  },

  // ÍTEM DE PRODUCTO
  productoItem: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 2, borderColor: '#27AE60' },
  productoInfo: { flex: 1, marginLeft: 10 },
  productoNombre: { fontSize: 15, fontWeight: '600', color: '#2C3E50' },
  productoDetalle: { fontSize: 13, color: '#7F8C8D' },
  prioridadText: { fontSize: 18, marginHorizontal: 8 },
  deleteButton: { padding: 6 },

  calcularButton: { backgroundColor: '#F3902B', marginHorizontal: 40, marginVertical: 30, paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  calcularText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});

const ListP: React.FC = () => {
  const [presupuesto, setPresupuesto] = useState<string>('');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaCantidad, setNuevaCantidad] = useState('');
  const [nuevaPrioridad, setNuevaPrioridad] = useState<'alta' | 'media' | 'baja'>('media');

  const handlePresupuestoChange = (text: string) => {
    const numeric = text.replace(/[^0-9.]/g, '');
    const parts = numeric.split('.');
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 2) return;
    setPresupuesto(numeric);
  };

  const agregarProducto = () => {
    if (!nuevoNombre.trim()) {
      Alert.alert('Error', 'El nombre del producto es obligatorio');
      return;
    }
    if (!nuevaCantidad.trim() || isNaN(Number(nuevaCantidad))) {
      Alert.alert('Error', 'La cantidad debe ser un número');
      return;
    }

    const nuevo: Producto = {
      id: Date.now().toString(),
      nombre: nuevoNombre.trim(),
      cantidad: nuevaCantidad.trim(),
      prioridad: nuevaPrioridad,
    };

    setProductos(prev => [...prev, nuevo]);
    setNuevoNombre('');
    setNuevaCantidad('');
    setNuevaPrioridad('media');
  };

  const eliminarProducto = (id: string) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  const renderProducto = ({ item }: { item: Producto }) => (
    <View style={styles.productoItem}>
      <View style={styles.productoInfo}>
        <Text style={styles.productoNombre}>Producto: {item.nombre}</Text>
        <Text style={styles.productoDetalle}>
          Cantidad: {item.cantidad}, Prioridad: {item.prioridad}
        </Text>
      </View>
      <Text style={styles.prioridadText}>
        {item.prioridad === 'alta' ? '★' : item.prioridad === 'media' ? '⭑' : '☆'}
      </Text>
      <TouchableOpacity onPress={() => eliminarProducto(item.id)} style={styles.deleteButton}>
        <Text style={{ fontSize: 24, color: '#E53935' }}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={require('./assets/fondo2.png')} style={styles.ola} />
      <TouchableOpacity style={styles.backButton}>
        <Text style={{ fontSize: 28, color: '#FFFFFF' }}>Back</Text>
      </TouchableOpacity>
      <Image source={require('./assets/MMP(L).png')} style={styles.logo} />
      <Text style={styles.title}>Presupuesto</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.prefix}>S/.</Text>
        <TextInput
          placeholder="0.00"
          placeholderTextColor="#CCCCCC"
          style={styles.input}
          value={presupuesto}
          onChangeText={handlePresupuestoChange}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.listaContainer}>
        <View style={styles.listaHeader}>
          <Text style={styles.listaTitle}>Lista</Text>
          <TouchableOpacity style={styles.addButton} onPress={agregarProducto}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* 3 CAMPOS: Producto, Cantidad, Prioridad (Picker) */}
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
          {/* PICKER DE PRIORIDAD */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={nuevaPrioridad}
              onValueChange={(itemValue) => setNuevaPrioridad(itemValue)}
              style={styles.picker}
              dropdownIconColor="#27AE60"
            >
              <Picker.Item label="Alta" value="alta" />
              <Picker.Item label="Media" value="media" />
              <Picker.Item label="Baja" value="baja" />
            </Picker>
          </View>
        </View>

        {/* LISTA DE PRODUCTOS */}
        <FlatList
          data={productos}
          renderItem={renderProducto}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#FFF', marginTop: 20, fontStyle: 'italic' }}>
              Agrega productos con el botón +
            </Text>
          }
        />
      </View>

      <TouchableOpacity style={styles.calcularButton}>
        <Text style={styles.calcularText}>Calcular</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListP;