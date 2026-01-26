import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {AddProjectView} from "@/components/AddProjectView";
import {getTheme} from "@/assets/styles";
import {useColorScheme} from "react-native";

export default function Project() {

    const theme = getTheme(useColorScheme())
    return (
        <SafeAreaProvider style={{backgroundColor:theme.colors.background}}>
            <SafeAreaView>
                <AddProjectView/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
