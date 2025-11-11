import React, { useState, useEffect, useRef } from 'react';
import {
  View,  Text,  StyleSheet,  Image,  Animated,  Easing,  Dimensions,  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

const PHRASES = [
  'Buscando tus mejores opciones de compra',
  'Analizando ofertas para ayudarte a ahorrar',
  'Explorando los mejores mercados para ti…',
];

const TOTAL_DURATION = 9000; //9 segundos
const INTERVAL = 3000; //3 segundos

const Search: React.FC = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current; //Mantener referencia estable

  useEffect(() => {
    //// Cambiar frase cada 3 segundos
    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, INTERVAL);
    // Animar barra de progreso (9 segundos)
    Animated.timing(progress, {
      toValue: 1,
      duration: TOTAL_DURATION,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
        //Al completar animación
      Alert.alert('Búsqueda completada', 'Tus resultados están listos.');
    });
    // Limpiar intervalos
    return () => clearInterval(phraseInterval);
  }, [progress]);
  // Convertir progreso a ancho de barra
  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 80],
  });

  return (
    <View style={styles.container}>
         {/* Imagen central */}
      <Image
        source={require('../assets/Busqueda1.png')}
        style={styles.image}
        resizeMode="contain"
      />
      {/* Texto dinámico */}
      <Text style={styles.phraseText}>
        {PHRASES[currentPhraseIndex]}
      </Text>
      {/* Barra de progreso */}
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
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