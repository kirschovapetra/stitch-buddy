import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {AddProjectView} from "@/components/ui/AddProjectView";
import {useTheme} from "react-native-paper";
import {useThemeContext} from "@/components/helpers/ThemeContext";

/**
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
