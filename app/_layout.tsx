import { Stack } from "expo-router";
import {configureFonts, PaperProvider, useTheme, Text} from "react-native-paper";
import {useFonts} from "expo-font";
export default function RootLayout() {

    const [loaded] = useFonts({
        'Lineseed-Bold': require('@/assets/fonts/LINE_Seed_JP/LINESeedJP-Bold.ttf'),
        'Lineseed-ExtraBold': require('@/assets/fonts/LINE_Seed_JP/LINESeedJP-ExtraBold.ttf'),
        'Lineseed-Thin': require('@/assets/fonts/LINE_Seed_JP/LINESeedJP-Thin.ttf'),
        'Lineseed-Regular': require('@/assets/fonts/LINE_Seed_JP/LINESeedJP-Regular.ttf'),
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

    const theme = useTheme();

    if (!loaded) {
        return (
            <PaperProvider theme={theme}>
                <Text>Loading...</Text>
            </PaperProvider>
        );
    }

  return (
      <PaperProvider theme={{ ...theme, fonts }}>
          <Stack screenOptions={{headerShown: false}}/>
      </PaperProvider>
  );
}
