import { useFonts } from 'expo-font';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../js/styles";
import { Dimensions, TextInput, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { useState, useEffect, useMemo } from 'react';

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
  const screenWidth = Dimensions.get('window').width;
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [progress, setProgress] = useState(0);  // Add loading state

  const increment = () => { if (count < (totalCount || 0)) setCount(count + 1); };
  const decrement = () => { if (count > 0) setCount(count - 1); };
  const reset = () => {
    setTotalCount(0);
    setCount(0);
  };
  useEffect(() => {
    const loadDataAsync = async () => {
      const loadedTotalCount = await loadData(`${itemKey}_total`);
      const loadedCount = await loadData(itemKey);

      // Update both count and totalCount in sequence
      setTotalCount(loadedTotalCount);
      setCount(loadedCount);

      setLoading(false);  // Set loading to false once data is loaded
    };

    loadDataAsync();
  }, [itemKey]); // Depend on itemKey so it reloads if the itemKey changes
  useEffect(() => {
    if (!loading) {  // Only store data after loading is complete
      storeData(itemKey, count);
      storeData(`${itemKey}_total`, totalCount);

      const safeTotal = totalCount === 0 ? 1 : totalCount;
      setProgress(count / safeTotal);
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
        style={[styles.input, { width: screenWidth * 0.8 }]}
        keyboardType="numeric"
        value={totalCount.toString()}
        onChangeText={(text) => {
          const parsed = parseInt(text);
          setTotalCount(isNaN(parsed) ? 0 : parsed);
        }}
        placeholder="0"
      />

      <View style={[styles.buttonContainer, { width: screenWidth * 0.8 }]}>
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
          style={[styles.button, styles.plusButton, (count === totalCount || totalCount === 0) && styles.disabledButton]}
          disabled={count === totalCount || totalCount === 0}
        >
          <Entypo name="plus" size={40} color="#fff" />
        </TouchableOpacity>
      </View>

        {/* Progress Bar */}
      <View style={[styles.progressBarContainer, { width: screenWidth * 0.8 }]}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${count > 0 ? Math.min((count / totalCount) * 100, 100) : 0}%`,
              backgroundColor: (count === totalCount && count > 0) ? '#68c46c' : '#9f68a8',
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

  const [loaded, error] = useFonts({
    'Nunito': require('../assets/fonts/Nunito.ttf'),
    ...MaterialCommunityIcons.font,
    ...Entypo.font,
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
    <ScrollView contentContainerStyle={styles.container}>
      <CountBlock title="Row Counter" itemKey="row" />
      <View style={styles.separator} />
      <CountBlock title="Stitch Counter" itemKey="stitch" />
    </ScrollView>
  );
}
