// Screens/Result.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Result: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { result, userDistrict } = route.params || {};

  if (!result || !result.mejores_tiendas || result.mejores_tiendas.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 100, color: '#E74C3C' }}>
          No se encontraron tiendas con esos productos.
        </Text>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => navigation.navigate('IngresarD')}
        >
          <Text style={styles.exitButtonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const tiendas = result.mejores_tiendas;
  const tiendaMasCercana = result.tienda_mas_cercana;

  return (
    <ScrollView style={styles.container}>

      <Image
        source={require('../assets/mapa1.png')}
        style={styles.mapImage}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        Tus mejores opciones en {userDistrict || 'Lima'}
      </Text>

      {tiendas.map((tienda: any, index: number) => (
        <View
          key={index}
          style={[
            styles.storeCard,
            index === 0 && styles.storeCardHighlighted,
          ]}
        >
          <Text
            style={[
              styles.storeText,
              index === 0 && styles.storeTextHighlighted,
            ]}
          >
            #{index + 1} {tienda.nombre_tienda}
          </Text>
          <Text style={styles.districtText}>({tienda.distrito})</Text>
          <Text
            style={[
              styles.priceText,
              index === 0 && styles.priceTextHighlighted,
            ]}
          >
            Total: S/ {tienda.precio_total.toFixed(2)}
          </Text>
          {index === 0 && (
            <Text style={styles.ahorroText}>
              ¡La más barata del mercado!
            </Text>
          )}
        </View>
      ))}

      <View style={styles.recommendationBox}>
        <Text style={styles.recommendationTitle}>Tienda más cercana:</Text>
        <Text style={styles.recommendationStore}>{tiendaMasCercana}</Text>
        <Text style={styles.recommendationSubtitle}>
          Está cerca de {userDistrict} y tiene todo lo que buscaste
        </Text>
      </View>

      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => navigation.navigate('IngresarD')}
      >
        <Text style={styles.exitButtonText}>NUEVA BÚSQUEDA</Text>
      </TouchableOpacity>
    </ScrollView>  
  );                 
};                  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  mapImage: {
    width: width * 0.9,
    height: width * 0.65,
    alignSelf: 'center',
    marginBottom: 30,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E74C3C',
    textAlign: 'center',
    marginBottom: 20,
  },
  storeCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#27AE60',
    elevation: 3,
  },
  storeCardHighlighted: {
    backgroundColor: '#FFB300',
    borderColor: '#F39C12',
    elevation: 10,
  },
  storeText: {
    fontSize: 19,
    color: '#2C3E50',
    fontWeight: '600',
  },
  storeTextHighlighted: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 21,
  },
  districtText: {
    fontSize: 15,
    color: '#7F8C8D',
    marginTop: 6,
  },
  priceText: {
    fontSize: 20,
    color: '#27AE60',
    fontWeight: 'bold',
    marginTop: 10,
  },
  priceTextHighlighted: {
    color: '#FFFFFF',
  },
  ahorroText: {
    fontSize: 15,
    color: '#FFFFFF',
    backgroundColor: '#27AE60',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    fontWeight: 'bold',
  },
  recommendationBox: {
    backgroundColor: '#27AE60',
    padding: 28,
    borderRadius: 20,
    marginVertical: 30,
    alignItems: 'center',
  },
  recommendationTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  recommendationStore: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  recommendationSubtitle: {
    fontSize: 16,
    color: '#E8F5E9',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  exitButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  exitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default Result;