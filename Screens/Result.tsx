// src/screens/Result.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Store {
  id: string;
  name: string;
  price: number;
  district: string;
}

const stores: Store[] = [
  { id: 'A', name: 'Tienda A', price: 150, district: 'Surco' },
  { id: 'B', name: 'Tienda B', price: 120, district: 'Surco' },
  { id: 'C', name: 'Tienda C', price: 110, district: 'Surco' },
];

// Encontrar la tienda con mejor precio
const bestStore = stores.reduce((prev, current) =>
  current.price < prev.price ? current : prev
);

const Result: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Imagen del mapa */}
      <Image
        source={require('../assets/mapa1.png')}
        style={styles.mapImage}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>Tiendas encontrada</Text>

      {/* Lista de tiendas */}
      {stores.map((store) => (
        <View
          key={store.id}
          style={[
            styles.storeCard,
            store.id === bestStore.id && styles.storeCardHighlighted,
          ]}
        >
          <Text
            style={[
              styles.storeText,
              store.id === bestStore.id && styles.storeTextHighlighted,
            ]}
          >
            {store.name} - S/. {store.price}
          </Text>
        </View>
      ))}

      {/* Recomendación */}
      <Text style={styles.recommendation}>
        Se recomienda comprar en {bestStore.name}
      </Text>

      {/* Botón SALIR */}
      <TouchableOpacity style={styles.exitButton}>
        <Text style={styles.exitButtonText}>SALIR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  mapImage: {
    width: width * 0.85,
    height: width * 0.65,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
  },
  storeCard: {
    width: '100%',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#27AE60',
  },
  storeCardHighlighted: {
    backgroundColor: '#FFB300',
    borderColor: '#F39C12',
  },
  storeText: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'Poppins-Medium',
  },
  storeTextHighlighted: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  recommendation: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  exitButton: {
    backgroundColor: '#27AE60',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
  },
});

export default Result;