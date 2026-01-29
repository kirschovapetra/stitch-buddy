import { Stack } from "expo-router";
import {configureFonts, PaperProvider, Text} from "react-native-paper";
import {useFonts} from "expo-font";
import {getTheme} from "@/assets/styles";
import {useColorScheme} from "react-native";
/**
 *
 * @constructor
 */
export default function RootLayout() {


    const colorScheme = useColorScheme();
    const theme = getTheme(colorScheme)

    const [loaded] = useFonts({
        'Lineseed-Bold': require('@/assets/fonts/LINESeedJP-Bold.ttf'),
        'Lineseed-ExtraBold': require('@/assets/fonts/LINESeedJP-ExtraBold.ttf'),
        'Lineseed-Thin': require('@/assets/fonts/LINESeedJP-Thin.ttf'),
        'Lineseed-Regular': require('@/assets/fonts/LINESeedJP-Regular.ttf'),
    });

    const baseVariants = configureFonts({ config: { fontFamily: 'Lineseed-Regular'} });

    const fonts = configureFonts({
        config: {
            ...baseVariants,
            ...{
                titleMedium: {
                    ...baseVariants.titleMedium,
                    fontFamily: 'Lineseed-Bold',
                },
                titleLarge: {
                    ...baseVariants.titleLarge,
                    fontFamily: 'Lineseed-ExtraBold',
                }
            },
        },
    });

    if (!loaded) {
        return (
            <PaperProvider theme={theme}>
                <Text>Loading...</Text>
            </PaperProvider>
        );
    }

  return (
      <PaperProvider theme={{ ...theme, fonts }} >
          <Stack screenOptions={{headerShown: false}}/>
      </PaperProvider>
  );
}
