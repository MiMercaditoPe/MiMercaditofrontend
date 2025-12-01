// Screens/Search.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PHRASES = [
  'Buscando las mejores ofertas para ti...',
  'Comparando precios en todas las tiendas',
  'Calculando la opción más cercana y económica',
  '¡Casi listo! Estamos encontrando tu mejor compra',
];

const TOTAL_DURATION = 9000; // 9 segundos
const INTERVAL = 2500;

export default function Search() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // Datos que vienen de Lista.tsx
  const { userDistrict, presupuesto, productos } = route.params;

  const progress = useRef(new Animated.Value(0)).current;
  const heartbeatScale = useRef(new Animated.Value(1)).current;
  const [currentPhraseIndex, setCurrentPhraseIndex] = React.useState(0);

  // URL del backend (tu backend en Railway)
  const BACKEND_URL = "https://mimercaditopebackend-production.up.railway.app";

  useEffect(() => {
    // Cambiar frases cada 2.5 segundos
    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, INTERVAL);

    // Animación de barra de progreso
    Animated.timing(progress, {
      toValue: 1,
      duration: TOTAL_DURATION,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // Latido del corazón (imagen)
    const pulse = () => {
      Animated.sequence([
        Animated.timing(heartbeatScale, {
          toValue: 1.1,
          duration: 600,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();

    // === LLAMADA AL BACKEND AL TERMINAR LA ANIMACIÓN ===
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/calcular`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            distrito_usuario: userDistrict,
            presupuesto: Number(presupuesto),
            productos: productos.map((p: any) => ({
              nombre: p.nombre.trim(),
              cantidad: parseFloat(p.cantidad) || 1.0,
              prioridad: p.prioridad,
            })),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || 'Error en el servidor');
        }

        // Éxito: vamos a Result con los datos reales
        navigation.replace('Result', {
          result: data,
          userDistrict: userDistrict,
        });
      } catch (error: any) {
        console.error("Error en la búsqueda:", error);
        Alert.alert(
          'No se encontraron resultados',
          error.message || 'Intenta con otro presupuesto o productos más comunes.',
          [{ text: 'Volver', onPress: () => navigation.navigate('ListP') }]
        );
      }
    }, TOTAL_DURATION);

    return () => {
      clearInterval(phraseInterval);
      clearTimeout(timer);
    };
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 80],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/Busqueda1.png')} // Asegúrate de tener esta imagen
        style={[styles.image, { transform: [{ scale: heartbeatScale }] }]}
        resizeMode="contain"
      />

      <Text style={styles.phraseText}>{PHRASES[currentPhraseIndex]}</Text>

      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>

      <Text style={styles.tipText}>
        Analizando {productos.length} producto(s) en {presupuesto} soles...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8E9775',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: width * 0.75,
    height: width * 0.75,
    marginBottom: 40,
  },
  phraseText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600',
    lineHeight: 28,
  },
  progressContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#6B7A5A',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFB300',
    borderRadius: 8,
  },
  tipText: {
    color: '#E0E0E0',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});