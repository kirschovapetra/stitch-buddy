import React from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {ProjectsList} from "@/components/ProjectsList";
import {getTheme} from "@/assets/styles";
import {useColorScheme} from "react-native";
export default function Index() {

    const theme = getTheme(useColorScheme())
    return (
        <SafeAreaProvider style={{backgroundColor:theme.colors.background}}>
            <SafeAreaView>
                <ProjectsList/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}