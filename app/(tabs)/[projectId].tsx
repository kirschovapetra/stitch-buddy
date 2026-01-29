import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import ProjectDetail from "@/components/ui/ProjectDetail";
import { useLocalSearchParams } from 'expo-router';

/**
 *
 * @constructor
 */
export default function ProjectId() {
    const local = useLocalSearchParams();

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ProjectDetail projectId={local.projectId.toString()}/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
