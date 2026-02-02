import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FAB, IconButton, List, Text, TextInput} from "react-native-paper";
import {View} from "react-native";
import {useRouter} from "expo-router";
import {styles} from "@/assets/styles";
import {DeletionDialog} from "@/components/helpers/DeletionDialog";
import {compare, fetchKey, fetchMetadata} from "@/scripts/script";
import {ProjectMetadata, SORT_BY, SORT_DIRECTION, ThemeProps} from "@/assets/types";
import {ProjectsListItem} from "@/components/helpers/ProjectListItem";
import {LoadingScreen} from "@/components/ui/LoadingScreen";
import {SortingMenu} from "@/components/helpers/SortingMenu";
import {CustomHeader} from "@/components/helpers/CustomHeader";

/**
 *
 * @param setTheme
 * @constructor
 */
export function ProjectsList({setTheme}:ThemeProps) {
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
            await fetchMetadata().then((meta)=>setMetadata(meta));
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
        await fetchMetadata().then((meta)=>setMetadata(meta))
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
            <DeletionDialog
                visible={deletionDialogVisible}
                item={dialogItem}
                confirm={confirmDeletion}
                dismissDialog={dismissDeletionDialog}/>

            <CustomHeader title={"Projects"}
                          setTheme={setTheme}
                          backAllowed={false}
                          customComponents={(
                              <>
                                  {searchBarVisible &&
                                          <TextInput dense value={searchBarText}
                                                     onChangeText={x=>filterMetadata(x)}
                                                     onBlur={() => setSearchBarVisible(false)}
                                                     style={styles.textInputStyle}
                                          />
                                      }
                                  <IconButton icon="magnify" onPress={() => setSearchBarVisible(!searchBarVisible)}/>
                              </>
                          )}
            />
            <List.Section style={styles.mainContainer}>
                <View style={{alignSelf:"flex-start"}} >
                    <SortingMenu sortMetadata={sortMetadata}
                                 sortBy={sortBy}
                                 setSortBy={setSortBy}
                                 sortDirection={sortDirection}
                                 setSortDirection={setSortDirection}
                                />
                </View>
                { !isLoaded? <LoadingScreen/>
                    : (metadata.length===0 ? <Text variant="bodyLarge" style={{marginTop: 10}}>No project available</Text>
                            :metadata.map(item => {
                                return (
                                    <ProjectsListItem key={item.id}
                                                      item={item}
                                                      showDeletionDialog={showDeletionDialog}
                                                      setMetadata={setMetadata}/>
                                )})
                    )
                }
            </List.Section>

            <View style={styles.mainContainer}>
                <FAB icon="plus-circle"
                     variant="primary"
                     onPress={()=>router.navigate(`/add`)}
                     size="medium"
                     mode="elevated"
                    style={{alignSelf:"flex-end"}}
                />
            </View>
            </>
    );
}