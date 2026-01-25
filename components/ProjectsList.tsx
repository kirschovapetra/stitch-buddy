import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FAB, List, Text} from "react-native-paper";
import {View} from "react-native";
import {useRouter} from "expo-router";
import {styles} from "@/assets/styles";
import {DeletionDialog} from "@/components/DeletionDialog";
import {fetchMetadata} from "@/scripts/script";
import {ProjectMetadata} from "@/assets/types";
import {ProjectsListItem} from "@/components/ProjectListItem";

export function ProjectsList() {
    const [metadata, setMetadata] = useState<ProjectMetadata[]>([])
    const [deletionDialogVisible, setDeletionDialogVisible] = useState(false);
    const [dialogItem, setDialogItem] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const loadProjects = async () => {
            setMetadata(await fetchMetadata());
        };
        loadProjects();
    }, []);

    const deleteProject = async () => {
        try {

            await AsyncStorage.removeItem(dialogItem.id);
            await AsyncStorage.setItem('metadata',JSON.stringify(
                metadata.filter((metaItem) => metaItem.id !== dialogItem.id)
            ));
            setMetadata(await fetchMetadata());
        } catch (e) {
            console.error(e);
        }
    };
    const showDeletionDialog = (item:ProjectMetadata) => {
        setDialogItem(item)
        setDeletionDialogVisible(true)
    };

    const dismissDeletionDialog = () => {
        setDialogItem(null)
        setDeletionDialogVisible(false)
    };
    const confirmDeletion = () => {
        deleteProject();
        dismissDeletionDialog()
    };


    return (
        <>
            <List.Section style={styles.mainContainer}>
                <List.Subheader><Text variant="titleLarge">Projects</Text></List.Subheader>
                {metadata.map(item => {
                    return (
                        <ProjectsListItem key={item.id} item={item} showDeletionDialog={showDeletionDialog} setMetadata={setMetadata} metadata={metadata}/>
                    );
                })}
            </List.Section>
            <View style={{...styles.mainContainer, ...styles.projectsListButtonsContainer}}>
                <FAB icon="plus-circle" variant="secondary" onPress={()=>router.navigate(`/add`)} size="medium"/>
            </View>
            <DeletionDialog
                visible={deletionDialogVisible}
                item={dialogItem}
                confirm={confirmDeletion}
                dismissDialog={dismissDeletionDialog}/>
        </>
    );
}