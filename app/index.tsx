import React from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {ProjectsList} from "@/components/ui/ProjectsList";
import {useTheme} from "react-native-paper";
import {useThemeContext} from "@/components/helpers/ThemeContext";
/**
 * Initial screen. Displays a list of projects
 * and allows navigation to create a new project
 * or view project details.
 *
 * @constructor
 */
export default function Index() {
    const theme = useTheme()
    const { setTheme } = useThemeContext();

    return (
        <SafeAreaProvider style={{backgroundColor:theme.colors.background}}>
            <SafeAreaView>
                <ProjectsList setTheme={setTheme}/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}