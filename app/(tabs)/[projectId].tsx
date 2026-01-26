import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import ProjectDetail from "@/components/ProjectDetail";
import { useLocalSearchParams } from 'expo-router';
import {getTheme} from "@/assets/styles";
import {useColorScheme} from "react-native";

export default function ProjectId() {
    const local = useLocalSearchParams();

    const theme = getTheme(useColorScheme())
    return (
        <SafeAreaProvider style={{backgroundColor:theme.colors.background}}>
            <SafeAreaView>
                <ProjectDetail projectId={local.projectId}/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
