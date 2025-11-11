// src/screens/Search.tsx
import React, { useState, useEffect, useRef } from 'react';
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

const { width } = Dimensions.get('window');

const PHRASES = [
  'Buscando tus mejores opciones de compra',
  'Analizando ofertas para ayudarte a ahorrar',
  'Explorando los mejores mercados para ti…',
];

const TOTAL_DURATION = 9000;
const INTERVAL = 3000;

const Search: React.FC = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  
  // NUEVO: Animación de latido
  const heartbeatScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Frases cada 3 segundos
    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, INTERVAL);

    // Barra de progreso (9 segundos)
    Animated.timing(progress, {
      toValue: 1,
      duration: TOTAL_DURATION,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      Alert.alert('Búsqueda completada', 'Tus resultados están listos.');
    });

// LATIDO SUAVE (1.4 segundos por ciclo)
    const pulse = () => {
      Animated.sequence([
        Animated.timing(heartbeatScale, {
          toValue: 1.08,           // ← Solo 8% más grande
          duration: 600,           // ← Sube lento
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatScale, {
          toValue: 1,
          duration: 800,           // ← Baja más lento
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();

    return () => {
      clearInterval(phraseInterval);
    };
  }, [progress, heartbeatScale]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 80],
  });

  return (
    <View style={styles.container}>
      {/* IMAGEN CON LATIDO */}
      <Animated.Image
        source={require('../assets/Busqueda1.png')}
        style={[
          styles.image,
          { transform: [{ scale: heartbeatScale }] }, // ← EFECTO
        ]}
        resizeMode="contain"
      />

      <Text style={styles.phraseText}>
        {PHRASES[currentPhraseIndex]}
      </Text>

      <View style={styles.progressContainer}>
        <Animated.View
          style={[styles.progressBar, { width: progressWidth }]}
        />
      </View>
    </View>
  );
};

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
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Poppins-Medium',
    lineHeight: 26,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#6B7A5A',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFB300',
    borderRadius: 4,
  },
});

export default Search;