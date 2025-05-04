import { Stack } from "expo-router";
import { StyleProp, Text, TextStyle, View } from 'react-native';
import styles from "../js/styles";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

export default function RootLayout() {

  return <Stack
    screenOptions={{
      headerTitleAlign: 'center',
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <MaterialCommunityIcons name="flower-tulip" size={18} style={styles.heart as StyleProp<TextStyle>} />
          <Text style={styles.stackTitle as StyleProp<TextStyle>}>STITCH BUDDY</Text>
          <MaterialCommunityIcons name="flower-tulip" size={18} style={styles.heart as StyleProp<TextStyle>} />
        </View>
      ),
    }}
  />;
}
