import React from "react";
import {ActivityIndicator} from "react-native";
import {theme, styles} from "@/assets/styles";

export function LoadingScreen() {
    return (
        <ActivityIndicator animating={true} size="large" color={theme.colors.primary} style={styles.activityIndicator}/>
    );
}