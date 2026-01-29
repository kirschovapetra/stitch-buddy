import React, {useState} from "react";
import {IconButton, Surface, Text, TextInput} from "react-native-paper";
import {TouchableOpacity, View} from "react-native";
import {styles} from "@/assets/styles";
import {BUTTON_MODE, ProjectListItemProps} from "@/assets/types";
import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchMetadata, fetchMetadataItem} from "@/scripts/script";

/**
 *
 * @param item
 * @param showDeletionDialog
 * @param metadata
 * @param setMetadata
 * @constructor
 */
export function ProjectsListItem({item, showDeletionDialog, metadata, setMetadata}: ProjectListItemProps) {

    const [editAllowed, setEditAllowed] = useState(false)
    const [tempName, setTempName] = useState("")
    const router = useRouter();

    const renameProject = async (id: string, name: string) => {
        try {
            const found =  await fetchMetadataItem(id);
            const idx = metadata.indexOf(found);
            if (idx !== -1) {
                found.name = name;
                metadata[idx] = found;
                await AsyncStorage.setItem('metadata',JSON.stringify(metadata));
                setMetadata(await fetchMetadata());
            }
        } catch (e) {
            console.error(e);
        }
    };

    const confirmEdit = () => {
        if (editAllowed) {
            if (tempName.length === 0) return;

            renameProject(item.id, tempName);
        }
        else setTempName(item.name || "")

        setEditAllowed(!editAllowed);
    }

    const dismissEdit= () => {
        if (editAllowed) {
            setTempName(item.name);
            setEditAllowed(!editAllowed);
        } else {
            showDeletionDialog(item);
        }
    }

    const allowPress = () => {
        if (!editAllowed)
            router.navigate(`/${item.id}`)
    }

    return (
        <TouchableOpacity key={item.id} onPress={allowPress}>
            <Surface elevation={2} style={styles.projectsListItemContainer}>
                <View style={styles.projectListItemTextContainer}>
                    {editAllowed ?
                        <TextInput error={editAllowed && tempName===""}
                                   label={tempName==="" ? "Name must be filled" : ""}
                                   value={tempName} onChangeText={(text) => setTempName(text)}/> :
                        <Text>{item.name} {item.createdAt.toString()} {item.updatedAt.toString()}</Text>}
                </View>
                <View style={styles.projectListItemButtonContainer}>
                    <IconButton mode={BUTTON_MODE} icon={editAllowed ? "check" : "pencil-outline"} onPress={confirmEdit}/>
                    <IconButton mode={BUTTON_MODE} icon={editAllowed ? "cancel" : "trash-can"} onPress={dismissEdit}/>
                </View>
            </Surface>
        </TouchableOpacity>
    );
}