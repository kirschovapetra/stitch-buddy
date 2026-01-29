import React, {useState} from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {ProjectsList} from "@/components/ui/ProjectsList";
/**
 *
 * @constructor
 */
export default function Index() {

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ProjectsList/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}