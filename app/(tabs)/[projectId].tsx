import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import ProjectDetail from "@/components/ProjectDetail";
import { useLocalSearchParams } from 'expo-router';

export default function ProjectId() {
    const local = useLocalSearchParams();

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ProjectDetail projectId={local.projectId}/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
