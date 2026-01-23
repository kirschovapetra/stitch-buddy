import {FlatList} from "react-native";
import ProjectListItem from "@/components/ui/ProjectsListItem";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    useEffect(() => {
        const loadProjects = async () => {
            setData([...await fetchAllProjects()]);
        };
        loadProjects();
    }, []);

    return (
        <FlatList
            data={data}
            renderItem={
            ({item}) => <ProjectListItem project={item}/>
            }
        />
    );
}