import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FAB, IconButton, List, Surface, Text} from "react-native-paper";
import {TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import {styles} from "@/assets/styles";

export const fetchAllProjects = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        return keys !== null ? keys.toSorted() : [];
    } catch (e) {
        console.error(e);
        return [];
    }
};

export function ProjectsList() {
    const [data, setData] = useState<string[]>([])
    const router = useRouter();

    useEffect(() => {
        const loadProjects = async () => {
            setData(await fetchAllProjects());
        };
        loadProjects();
    }, []);

    const deleteProject = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
            setData(await fetchAllProjects());
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <List.Section style={styles.mainContainer}>
                <List.Subheader><Text variant="titleLarge">Projects</Text></List.Subheader>
                {data.map(item => {
                    return (
                        <TouchableOpacity key={item} onPress={()=>router.navigate(`/${item}`)}>
                            <Surface elevation={2} style={styles.projectsListItemContainer}>
                                <View style={styles.projectListItemTextContainer}><Text variant="bodyLarge">{item}</Text></View>
                                <View style={styles.projectListItemTextContainer}>
                                    <IconButton mode="contained-tonal" icon="trash-can" onPress={()=>deleteProject(item)}/>
                                </View>
                            </Surface>
                        </TouchableOpacity>
                    );
                })}
            </List.Section>
            <View style={{...styles.mainContainer, ...styles.projectsListButtonsContainer}}>
                <FAB icon="plus-circle" variant="secondary" onPress={()=>router.navigate(`/add`)} size="medium"/>
            </View>
        </>
    );
}