import * as React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {useRouter} from "expo-router";
import {styles} from "@/assets/styles";
import {ThemeMenu} from "@/components/helpers/ThemeMenu";
import {ThemeProps} from "@/assets/types";

/**
 *
 * @param title
 * @param setTheme
 * @constructor
 */
export function CustomHeader({title, setTheme}:ThemeProps) {
    const router = useRouter();
    const theme = useTheme();

    return (
        <Appbar.Header style={{...styles.projectsListHeaderContainer,
            backgroundColor:theme.colors.background}}>
            <Appbar.BackAction onPress={() => router.navigate("/")} />
            <Appbar.Content title={title} titleStyle={{paddingVertical:8}}/>
            <ThemeMenu setTheme={setTheme}/>
        </Appbar.Header>
    );
}