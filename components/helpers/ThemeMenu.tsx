import * as React from 'react';
import { Menu,  Appbar} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {getTheme, styles} from "@/assets/styles";
import {useEffect} from "react";
import {fetchKey} from "@/scripts/script";
import {THEME} from "@/assets/types";
import {useColorScheme} from "react-native";
export function ThemeMenu({setTheme}:{setTheme:any}) {
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
    const openMenu = () => setVisible(true);

    const closeMenu = async (theme:string) => {
        setSelected(theme);
        await AsyncStorage.setItem("theme", theme);
        setVisible(false);
        if (theme === "default") setTheme(getTheme(defaultScheme))
        else setTheme(getTheme(theme))
    };

    return (
        <Menu
            style={styles.menuContent}
            visible={visible}
            onDismiss={()=>closeMenu(selected)}
            anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
            <Menu.Item onPress={()=>closeMenu(THEME.LIGHT)} title="Light" disabled={selected===THEME.LIGHT}/>
            <Menu.Item onPress={()=>closeMenu(THEME.DARK)} title="Dark" disabled={selected===THEME.DARK}/>
            <Menu.Item onPress={()=>closeMenu(THEME.DEFAULT)} title="Default" disabled={selected===THEME.DEFAULT}/>
        </Menu>
    );
}