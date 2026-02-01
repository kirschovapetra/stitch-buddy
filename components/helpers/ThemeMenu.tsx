import * as React from 'react';
import {Menu, Text, IconButton} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {getTheme, styles} from "@/assets/styles";
import {useEffect} from "react";
import {fetchKey} from "@/scripts/script";
import {THEME, ThemeProps} from "@/assets/types";
import {useColorScheme} from "react-native";

/**
 *
 * @param setTheme
 * @constructor
 */
export function ThemeMenu({setTheme}:ThemeProps) {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<any>(THEME.DEFAULT);
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
    const defaultScheme = useColorScheme()

    useEffect(() => {
        const loadTheme = async () => {
            await fetchKey("theme", THEME.DEFAULT).then(async (theme)=> {
                setSelected(theme)
            })
        };
        if (!isLoaded) {
            loadTheme().then(()=>setIsLoaded(true));
        }
    }, [isLoaded]);

    const openMenu = () => {
        if (!visible) setVisible(true);
    };

    const closeMenu = () => {
        if (visible) setVisible(false)
    };

    const applyTheme = async (theme:string) => {
        closeMenu()
        setSelected(theme);
        await AsyncStorage.setItem("theme", theme).then(()=>{
                if (theme === THEME.DEFAULT) {
                    setTheme(getTheme(defaultScheme));
                } else {
                    setTheme(getTheme(theme));
                }
            }
        )
    };

    return (
        <Menu key={""+visible}
              anchorPosition="bottom"
              visible={visible}
              onDismiss={closeMenu}
              anchor={<IconButton icon="dots-vertical" onPress={openMenu}/>}>
            <Text variant="bodySmall" style={styles.sortMenuText}>Theme</Text>
            <Menu.Item onPress={()=>applyTheme(THEME.LIGHT)} title="Light" disabled={selected===THEME.LIGHT}/>
            <Menu.Item onPress={()=>applyTheme(THEME.DARK)} title="Dark" disabled={selected===THEME.DARK}/>
            <Menu.Item onPress={()=>applyTheme(THEME.DEFAULT)} title="Default" disabled={selected===THEME.DEFAULT}/>
        </Menu>
    );
}