import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import ProjectDetail from "@/components/ui/ProjectDetail";
import { useLocalSearchParams } from 'expo-router';
import {useTheme} from "react-native-paper";
import {useThemeContext} from "@/components/helpers/ThemeContext";

/**
 * Project detail screen.
 * Displays and manages data for a single project
 * based on the projectId route param.
 *
 * @constructor
 */
export default function ProjectId() {
    const local = useLocalSearchParams();
    const theme = useTheme()
    const { setTheme } = useThemeContext();
    return (
        <SafeAreaProvider style={{backgroundColor:theme.colors.background}}>
            <SafeAreaView>
                <ProjectDetail setTheme={setTheme} projectId={local.projectId.toString()}/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
