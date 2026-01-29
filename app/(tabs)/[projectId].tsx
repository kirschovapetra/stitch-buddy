import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import ProjectDetail from "@/components/ui/ProjectDetail";
import { useLocalSearchParams } from 'expo-router';
import {useTheme} from "react-native-paper";
import {useThemeContext} from "@/components/helpers/ThemeContext";

/**
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
