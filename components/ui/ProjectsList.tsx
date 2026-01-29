import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Appbar, FAB, List, Text, TextInput} from "react-native-paper";
import {View} from "react-native";
import {useRouter} from "expo-router";
import {styles} from "@/assets/styles";
import {DeletionDialog} from "@/components/helpers/DeletionDialog";
import {compare, fetchKey, fetchMetadata} from "@/scripts/script";
import {ProjectMetadata, SORT_BY, SORT_DIRECTION, TEXTINPUT_MODE} from "@/assets/types";
import {ProjectsListItem} from "@/components/helpers/ProjectListItem";
import {LoadingScreen} from "@/components/ui/LoadingScreen";
import {SortingMenu} from "@/components/helpers/SortingMenu";
import {ThemeMenu} from "@/components/helpers/ThemeMenu";

/**
 *
 * @constructor
 */
export function ProjectsList() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [metadata, setMetadata] = useState<ProjectMetadata[]>([])
    const [deletionDialogVisible, setDeletionDialogVisible] = useState(false);
    const [dialogItem, setDialogItem] = useState<ProjectMetadata>();
    const [sortBy, setSortBy] = useState<any>();
    const [sortDirection, setSortDirection] = useState<any>();
    const [searchBarText, setSearchBarText] = useState<string>("");
    const [searchBarVisible, setSearchBarVisible] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const loadProjects = async () => {
            await fetchKey("sortBy", SORT_BY.NAME).then(async (by)=> {
                setSortBy(by)
                await fetchKey("sortDirection", SORT_DIRECTION.ASC).then(async (direction)=> {
                    setSortDirection(direction)
                    await fetchMetadata().then((meta) => {
                        setMetadata(meta.sort(compare(by,direction)))
                    })
                })
            })
        };
        if (!isLoaded) {
            loadProjects().then(()=>setIsLoaded(true));
        }
    }, [isLoaded]);

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
        deleteProject().then(() => {});
        dismissDeletionDialog()
    };

    const sortMetadata = async (sortByNew:SORT_BY=SORT_BY.NAME, sortDirectionNew:SORT_DIRECTION=SORT_DIRECTION.ASC) => {
        setMetadata(await fetchMetadata())
        if (sortByNew !== sortBy) {
            await AsyncStorage.setItem("sortBy", sortByNew)
        }
        if (sortDirectionNew !== sortDirection) {
            await AsyncStorage.setItem("sortDirection", sortDirectionNew)
        }
        setMetadata(metadata.sort(compare(sortByNew,sortDirectionNew)))
    }


    const filterMetadata = async (searchText:string) => {
        setSearchBarText(searchText)
        if (searchText.length === 0) {
            await fetchMetadata().then((meta) => {
                setMetadata(meta.sort(compare(sortBy,sortDirection)))
            })
        }
        else
            await fetchMetadata().then((meta) => {
                setMetadata(meta
                    .filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase()))
                    .sort(compare(sortBy,sortDirection))
                )
            })
    }


    return (
        <>
            <Appbar.Header style={styles.projectsListHeaderContainer}>
                <Appbar.Content title="Projects"/>
                {
                    searchBarVisible &&
                    <TextInput
                        dense
                        mode={TEXTINPUT_MODE}
                        value={searchBarText}
                        onChangeText={x=>filterMetadata(x)}
                        onBlur={() => setSearchBarVisible(false)}/>
                }
                <Appbar.Action icon="magnify" onPress={() => setSearchBarVisible(!searchBarVisible)}/>
                <ThemeMenu/>
            </Appbar.Header>
            <List.Section style={styles.mainContainer}>
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