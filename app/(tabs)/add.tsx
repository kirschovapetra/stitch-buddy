import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {AddProjectView} from "@/components/AddProjectView";

/**
 *
 * @constructor
 */
export default function Project() {

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <AddProjectView/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
