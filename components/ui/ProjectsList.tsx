import ProjectListItem from "@/components/ui/ProjectsListItem";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {List, Text} from "react-native-paper";

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
        <List.Section>
            <List.Subheader><Text variant="titleLarge">Projects</Text></List.Subheader>
            {data.map(item => {
                return (
                    <ProjectListItem project={item} key={item}/>
                );
            })}
        </List.Section>
    );
}