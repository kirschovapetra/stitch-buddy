import React from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {styles} from "@/assets/styles";
import {ProjectsList} from "@/components/ui/ProjectsList";
export default function Index() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ProjectsList/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}