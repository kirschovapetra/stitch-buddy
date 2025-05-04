import { Entypo } from '@expo/vector-icons';
// import { getLoadedFonts, useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo, useState } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../js/styles"

const storeData = async (itemKey: string, value: any) => {
  try {
    await AsyncStorage.setItem(itemKey, value.toString());
  } catch (e) {
    console.error(e)
  }
};

const loadData = async (itemKey: string): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem(itemKey);
    if (value !== null) {
      return parseInt(value)
    } else return 0
  } catch (e) {
    console.error(e)
    return 0
  }
};

export const CountBlock = ({title, itemKey}: any) => {
  const [count, setCount] = useState(0);
  const increment = () => { setCount(count + 1) };
  const decrement = () => { if (count > 0) setCount(count - 1) };
  const reset = () => setCount(0);

  useEffect(() => {
    const loadDataEffect = async () => {
      const result = await loadData(itemKey)
      setCount(result);
    };
    loadDataEffect()
  }, []);

  useEffect(() => {
    const storeDataEffect = async () => {
      storeData(itemKey, count);
    };
    storeDataEffect()
  }, [count]);


  return (
    <View style={styles.blockContainer}>
      <Text style={styles.titleText}>{title}</Text>

      <View style={styles.buttonContainer}>
        {/* Minus */}
        <Pressable
          onPress={decrement}
          style={[styles.button, styles.minusButton, count === 0 && styles.disabledButton]}
          disabled={count === 0}
        >
          <Entypo name="minus" size={40} color="#fff" />
        </Pressable>

        {/* Count */}
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count}</Text>
        </View>

        {/* Plus */}
        <Pressable onPress={increment} style={[styles.button, styles.plusButton]}>
          <Entypo name="plus" size={40} color="#fff" />
        </Pressable>
      </View>

      {/* Reset */}
      <Pressable onPress={reset} style={styles.resetButton}>
        <Text style={styles.resetText}>RESET</Text>
      </Pressable>
    </View>
  );
};

export default function App() {
  const screenWidth = Dimensions.get('window').width;
  const heartSize = 30; // total width including margin
  const heartCount = useMemo(() => Math.floor(screenWidth / heartSize), [screenWidth]);

  // const [loaded, error] = useFonts({
  //   'Nunito': require('../assets/fonts/Nunito.ttf')
  // });

  // useEffect(() => {

  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return <Text style={styles.titleText}>Shaving llamas</Text>;
  // }

  return (
    <View style={styles.container}>

      <CountBlock title="Row Counter" itemKey="row" />

      <View style={styles.separator}>
        <View style={styles.heartsRow}>
          {Array.from({ length: heartCount }).map((_, i) => (
            <Entypo key={i} name="heart-outlined" size={24} style={styles.heart} />
          ))}
        </View>
      </View>

      <CountBlock title="Stitch Counter" itemKey="stitch" />
    </View>
  );
}
