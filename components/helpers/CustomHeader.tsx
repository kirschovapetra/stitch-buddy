import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {useRouter} from "expo-router";
import {styles} from "@/assets/styles";
import {ThemeMenu} from "@/components/helpers/ThemeMenu";
export function CustomHeader({title, setTheme}:{title:string, setTheme:any}) {
    const router = useRouter();

    return (
        <Appbar.Header style={styles.projectsListHeaderContainer}>
            <Appbar.BackAction onPress={() => router.navigate("/")} />
            <Appbar.Content title={title} titleStyle={{paddingVertical:8}}/>
            <ThemeMenu setTheme={setTheme}/>
        </Appbar.Header>
    );
}