import { Stack } from "expo-router";
import {configureFonts, PaperProvider, Text, } from "react-native-paper";
import {useFonts} from "expo-font";
import {useColorScheme} from "react-native";
import {useEffect, useState} from "react";
import {getTheme} from "@/assets/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "@/components/helpers/ThemeContext";
import {LoadingScreen} from "@/components/ui/LoadingScreen";
/**
 *
 * @constructor
 */
export default function RootLayout() {

    const defaultScheme = useColorScheme()
    const [theme, setTheme] = useState<any>()
    const [isLoaded, setIsLoaded] = useState(false)
    const [fontsLoaded] = useFonts({
        'Lineseed-Bold': require('@/assets/fonts/LINESeedJP-Bold.ttf'),
        'Lineseed-ExtraBold': require('@/assets/fonts/LINESeedJP-ExtraBold.ttf'),
        'Lineseed-Thin': require('@/assets/fonts/LINESeedJP-Thin.ttf'),
        'Lineseed-Regular': require('@/assets/fonts/LINESeedJP-Regular.ttf'),
    });


    useEffect(() => {
        const loadThemeAsync = async () => {
            await AsyncStorage.getItem("theme").then((t) => {
                if (t === null || t === "default") setTheme(getTheme(defaultScheme))
                else setTheme(getTheme(t))
            });
        };
        if (!isLoaded) {
            loadThemeAsync().then(()=>setIsLoaded(true));
        }
    }, [isLoaded, defaultScheme, theme]);

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

    if (!isLoaded) return (<></>);
    if (!fontsLoaded) return (<LoadingScreen/>);
    return (
          <ThemeContext.Provider value={{ setTheme }}>
              <PaperProvider theme={{ ...theme, fonts }}>
                  <Stack screenOptions={{ headerShown: false }} />
              </PaperProvider>
          </ThemeContext.Provider>
  );
}
