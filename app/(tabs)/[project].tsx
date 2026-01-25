import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {styles} from "@/assets/styles";
import React from "react";
import ProjectDetail from "@/components/ui/ProjectDetail";
import { useLocalSearchParams } from 'expo-router';
export default function Project() {
    const local = useLocalSearchParams();

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ProjectDetail project={local.project}/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
