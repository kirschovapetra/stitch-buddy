import React from "react";
import {ActivityIndicator, View} from "react-native";
import {useTheme} from "react-native-paper";
/**
 * Loading indicator shown during async operations.
 *
 * @constructor
 */
export function LoadingScreen() {
    const theme = useTheme();
    return (
        <View style={{flex: 1,
            justifyContent: "center",
            alignItems: "center"}}>
            <ActivityIndicator animating={true} size="large" color={theme.colors.primary} style={{marginTop:30}}/>
        </View>
    );
}