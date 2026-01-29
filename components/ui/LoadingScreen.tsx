import React from "react";
import {ActivityIndicator} from "react-native";
import {styles} from "@/assets/styles";

/**
 *
 * @constructor
 */
export function LoadingScreen() {
    return (
        <ActivityIndicator animating={true} size="large" style={styles.activityIndicator}/>
    );
}