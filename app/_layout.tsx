import { Stack } from "expo-router";
import { Text, View } from 'react-native';
import styles from "../js/styles";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

export default function RootLayout() {
  return (
    <Stack
  screenOptions={{
    headerTitleAlign: 'center',
    headerTitle: () => (
      <View style={styles.titleRow}>
        <MaterialCommunityIcons name="flower-tulip" style={styles.icon} />
        <Text
          style={styles.stackTitle}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          STITCH BUDDY
        </Text>
        <MaterialCommunityIcons name="flower-tulip" style={styles.icon} />
      </View>
    ),
  }}
/>
  );
}