import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {AddProjectView} from "@/components/ui/AddProjectView";
import {useTheme} from "react-native-paper";
import {useThemeContext} from "@/components/helpers/ThemeContext";

/**
 * Screen for creating a new project.
 * Handles project form input, validation,
 * and saving.
 *
 * @constructor
 */
export default function Add() {
    const theme = useTheme()
    const { setTheme } = useThemeContext();
    return (
        <SafeAreaProvider style={{backgroundColor:theme.colors.background}}>
            <SafeAreaView>
                <AddProjectView setTheme={setTheme}/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
