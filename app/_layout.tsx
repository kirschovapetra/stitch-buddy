import {Stack} from "expo-router";
import {configureFonts, PaperProvider} from "react-native-paper";
import {useFonts} from "expo-font";
import {useColorScheme} from "react-native";
import {useEffect, useState} from "react";
import {getTheme} from "@/assets/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "@/components/helpers/ThemeContext";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync().then(()=>{});

/**
 * Root layout for the app.
 * Sets up global providers, navigation,
 * and shared configuration. Wraps all screens.
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

    SplashScreen.setOptions({
        duration: 1000,
        fade: true,
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

    useEffect(() => {
        if (isLoaded && fontsLoaded) {
            SplashScreen.hide();
        }
    }, [isLoaded, fontsLoaded]);

    if (!isLoaded || !fontsLoaded) {
        return null;
    }

    return (
          <ThemeContext.Provider value={{ setTheme }}>
                  <PaperProvider theme={{ ...theme, fonts }}>
                      <Stack initialRouteName="index" />
                  </PaperProvider>
          </ThemeContext.Provider>
  );
}
