// SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is set to 0

  useEffect(() => {
    // Start the fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Final opacity value
      duration: 2000, // Duration of the animation in milliseconds
      useNativeDriver: true,
    }).start();

    // Automatically navigate to Calculator after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Calculator');
    }, 2500); // Add slight delay to sync with animation

    // Clean up the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logoText, { opacity: fadeAnim }]}>
        Calculator App
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB', // Sky blue color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
