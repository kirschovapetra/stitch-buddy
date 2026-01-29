import React, {useState} from "react";
import {IconButton, Surface, Text, TextInput} from "react-native-paper";
import {TouchableOpacity, View} from "react-native";
import {styles} from "@/assets/styles";
import {BUTTON_MODE, ProjectListItemProps} from "@/assets/types";
import {useRouter} from "expo-router";
import {fetchMetadata, renameProject} from "@/scripts/script";

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

    const confirmEdit = async () => {
        if (editAllowed) {
            if (tempName.length === 0) return;

            await renameProject(metadata, item.id, tempName)
            setMetadata(await fetchMetadata());
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
                    <IconButton mode="contained" icon={editAllowed ? "check" : "pencil-outline"} onPress={confirmEdit}/>
                    <IconButton mode="contained" icon={editAllowed ? "cancel" : "trash-can"} onPress={dismissEdit}/>
                </View>
            </Surface>
        </TouchableOpacity>
    );
}