import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Stack } from "expo-router";
import { Text, View } from 'react-native';
import styles from "../js/styles";

export default function RootLayout() {
  return <Stack
    screenOptions={{
      headerTitleAlign: 'center',
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <MaterialCommunityIcons name="flower-tulip" size={20} style={styles.heart} />
          <Text style={styles.stackTitle}>
            STITCH BUDDY
          </Text>
          <MaterialCommunityIcons name="flower-tulip" size={20} style={styles.heart} />
        </View>
      ),
    }}
  />;
}
