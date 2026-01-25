import React from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {ProjectsList} from "@/components/ProjectsList";
export default function Index() {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ProjectsList/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}