import { Entypo, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../js/styles";
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';

// Prevent splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

const storeData = async (itemKey: string, value: any) => {
  try {
    await AsyncStorage.setItem(itemKey, value.toString());
  } catch (e) {
    console.error(e);
  }
};

const loadData = async (itemKey: string): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem(itemKey);
    return value !== null ? parseInt(value) : 0;
  } catch (e) {
    console.error(e);
    return 0;
  }
};

export const CountBlock = ({ title, itemKey }: any) => {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState('');
  const [loading, setLoading] = useState(true);  // Add loading state

  const increment = () => { if (count < (parseInt(totalCount) || 0)) setCount(count + 1); };
  const decrement = () => { if (count > 0) setCount(count - 1); };
  const reset = () => {
    setTotalCount('');
    setCount(0);
  };

  useEffect(() => {
    const loadDataAsync = async () => {
      const loadedTotalCount = await loadData(`${itemKey}_total`);
      const loadedCount = await loadData(itemKey);

      // Update both count and totalCount in sequence
      setTotalCount(loadedTotalCount.toString());
      setCount(loadedCount);

      setLoading(false);  // Set loading to false once data is loaded
    };

    loadDataAsync();
  }, [itemKey]); // Depend on itemKey so it reloads if the itemKey changes

  useEffect(() => {
    if (!loading) {  // Only store data after loading is complete
      storeData(itemKey, count);
      storeData(`${itemKey}_total`, totalCount);
    }
  }, [count, totalCount, loading, itemKey]);

  if (loading) {
    return <Text>Loading...</Text>;  // Show loading text until data is loaded
  }

  return (
    <View style={styles.blockContainer}>
      <Text style={styles.titleText}>{title}</Text>

      {/* Description and Input */}
      <Text style={{ color: '#9f68a8', fontSize: 12, marginBottom: 4 }}>
        How many in total?
      </Text>
      <TextInput
        style={[styles.input, { textAlign: 'center' }]}
        keyboardType="numeric"
        value={totalCount}
        onChangeText={(text) => {
          setTotalCount(text);
        }}
        placeholder="0"
      />

      <View style={styles.buttonContainer}>
        {/* Minus Button */}
        <TouchableOpacity
          onPress={decrement}
          style={[styles.button, styles.minusButton, count === 0 && styles.disabledButton]}
          disabled={count === 0}
        >
          <Entypo name="minus" size={40} color="#fff" />
        </TouchableOpacity>

        {/* Count */}
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count}</Text>
        </View>

        {/* Plus Button */}
        <TouchableOpacity
          onPress={increment}
          style={[styles.button, styles.plusButton, count === totalCount && styles.disabledButton]}
          disabled={count === totalCount}
        >
          <Entypo name="plus" size={40} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${count > 0 ? Math.min((count / parseInt(totalCount)) * 100, 100) : 0}%`,
              backgroundColor: (count === parseInt(totalCount) && count > 0) ? '#68c46c' : '#9f68a8',
            },

          ]}
        />
      </View>

      {/* Reset Button */}
      <TouchableOpacity onPress={reset} style={styles.resetButton}>
        <Text style={styles.resetText}>RESET</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  const screenWidth = Dimensions.get('window').width;
  const heartSize = 30;
  const heartCount = useMemo(() => Math.floor(screenWidth / heartSize), [screenWidth]);

  const [loaded, error] = useFonts({
    'Nunito': require('../assets/fonts/Nunito.ttf'),
    ...Entypo.font,
    ...Ionicons.font,
    ...MaterialCommunityIcons.font,
    ...AntDesign.font
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return <Text style={styles.titleText}>Shaving llamas</Text>;
  }

  return (
    <View style={styles.container}>
      <CountBlock title="Row Counter" itemKey="row" />
      <View style={styles.separator} />
      <CountBlock title="Stitch Counter" itemKey="stitch" />
    </View>
  );
}
