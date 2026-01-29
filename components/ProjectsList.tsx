import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FAB, List, Text} from "react-native-paper";
import {View, useColorScheme} from "react-native";
import {useRouter} from "expo-router";
import {getTheme, styles} from "@/assets/styles";
import {DeletionDialog} from "@/components/DeletionDialog";
import {compare, fetchKey, fetchMetadata} from "@/scripts/script";
import {ProjectMetadata, SORT_BY, SORT_DIRECTION} from "@/assets/types";
import {ProjectsListItem} from "@/components/ProjectListItem";
import {LoadingScreen} from "@/components/LoadingScreen";
import {SortingMenu} from "@/components/SortingMenu";

/**
 *
 * @constructor
 */
export function ProjectsList() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [metadata, setMetadata] = useState<ProjectMetadata[]>([])
    const [deletionDialogVisible, setDeletionDialogVisible] = useState(false);
    const [dialogItem, setDialogItem] = useState<ProjectMetadata>();
    const [sortBy, setSortBy] = useState<any>(SORT_BY.NAME);
    const [sortDirection, setSortDirection] = useState<any>(SORT_DIRECTION.ASC);
    const router = useRouter();
    const theme = getTheme(useColorScheme())

    useEffect(() => {
        const loadProjects = async () => {
            setMetadata(await fetchMetadata());
            setSortBy(await fetchKey("sortBy", SORT_BY.NAME));
            setSortDirection(await fetchKey("sortDirection", SORT_DIRECTION.ASC));
        };
        loadProjects();
        setIsLoaded(true)
    }, []);

    const deleteProject = async () => {
        try {
            await AsyncStorage.removeItem(`project:${dialogItem !== undefined ? dialogItem.id : ""}`);
            await AsyncStorage.setItem('metadata',JSON.stringify(
                metadata.filter((metaItem) => dialogItem !== undefined && metaItem.id !== dialogItem.id)
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
        setDialogItem(undefined)
        setDeletionDialogVisible(false)
    };
    const confirmDeletion = () => {
        deleteProject();
        dismissDeletionDialog()
    };

    const sortMetadata = async (sortByNew:SORT_BY, sortDirectionNew:SORT_DIRECTION) => {
        if (sortByNew !== sortBy) {
            await AsyncStorage.setItem("sortBy", sortByNew)
        }
        if (sortDirectionNew !== sortDirection) {
            await AsyncStorage.setItem("sortDirection", sortDirectionNew)
        }
        await AsyncStorage.setItem('metadata',JSON.stringify(
            metadata.sort(compare(sortByNew,sortDirectionNew))
        ));
        setMetadata(await fetchMetadata());
    }

    return (
        <>
            <List.Section style={{...styles.mainContainer}}>
                <View style={styles.projectsListHeaderContainer}>
                    <SortingMenu sortMetadata={sortMetadata}
                                 sortBy={sortBy}
                                 setSortBy={setSortBy}
                                 sortDirection={sortDirection}
                                 setSortDirection={setSortDirection}/>
                </View>
                { !isLoaded? <LoadingScreen/>
                    : (metadata.length===0 ? <Text variant="bodyLarge">No project available</Text>
                            :metadata.map(item => {
                                return (
                                    <ProjectsListItem key={item.id}
                                                      item={item}
                                                      showDeletionDialog={showDeletionDialog}
                                                      setMetadata={setMetadata}
                                                      metadata={metadata}/>
                                )})
                    )
                }
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