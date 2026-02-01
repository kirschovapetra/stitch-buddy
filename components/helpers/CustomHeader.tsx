import * as React from 'react';
import {Stack} from "expo-router";
import {ThemeProps} from "@/assets/types";
import {useTheme} from "react-native-paper";
import {ThemeMenu} from "@/components/helpers/ThemeMenu";

/**
 *
 * @param title
 * @param setTheme
 * @param customComponents
 * @constructor
 */
export function CustomHeader({title, setTheme, customComponents}:ThemeProps) {
    const theme = useTheme();

    return (
    <Stack.Screen
        options={{
            title: `${title}`,
            headerStyle: {backgroundColor:theme.colors.surface},
            headerTintColor: `${theme.colors.onSurface}`,
            statusBarStyle: `${theme.dark?"light":"dark"}`,
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