import React from "react";
import {ActivityIndicator} from "react-native";
import {styles} from "@/assets/styles";

export function LoadingScreen({theme}:{theme: any}) {
    return (
        <ActivityIndicator animating={true} size="large" color={theme.colors.primary} style={{...styles.activityIndicator, backgroundColor:theme}}/>
    );
}