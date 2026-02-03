import * as React from 'react';
import {Stack} from "expo-router";
import {ThemeProps} from "@/assets/types";
import {useTheme} from "react-native-paper";
import {ThemeMenu} from "@/components/helpers/ThemeMenu";

/**
 * Configures the screen header with title, theme menu, and optional actions.
 *
 * @param title Header title
 * @param setTheme Theme toggle handler
 * @param backAllowed Enable back navigation
 * @param customComponents Optional header components
 * @constructor
 */
export function CustomHeader({title, setTheme, backAllowed, customComponents}:ThemeProps) {
    const theme = useTheme();

    return (
    <Stack.Screen
        options={{
            title: `${title}`,
            headerStyle: {backgroundColor:theme.colors.surface},
            headerTintColor: `${theme.colors.onSurface}`,
            statusBarStyle: `${theme.dark?"light":"dark"}`,
            headerBackVisible: backAllowed || true,
            headerRight: () => (
                <>
                    {customComponents}
                    <ThemeMenu setTheme={setTheme}/>
                </>
            )
        }}
    />
    );
}