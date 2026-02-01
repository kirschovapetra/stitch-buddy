import React, {useState} from "react";
import {IconButton, Surface, Text, TextInput, useTheme} from "react-native-paper";
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
export function ProjectsListItem({item, showDeletionDialog, setMetadata}: ProjectListItemProps) {

    const [editAllowed, setEditAllowed] = useState(false)
    const [tempName, setTempName] = useState("")
    const router = useRouter();
    const theme=useTheme()

    const dismissEdit= () => {
        if (editAllowed) {
            setTempName(item.name);
            setEditAllowed(!editAllowed);
        } else {
            showDeletionDialog(item);
        }
    }

    const confirmEdit = async () => {

        if (!editAllowed) setTempName(item.name || "")
        else if (tempName === item.name) dismissEdit()
        else {
            if (tempName.length === 0) return;
            await renameProject(item.id, tempName)
                .then(async ()=>{
                await fetchMetadata()
                    .then((m)=>setMetadata(m))
            })
        }
        setEditAllowed(!editAllowed);
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
                        <Text>{item.name}</Text>}
                </View>
                <View style={styles.projectListItemButtonContainer}>
                    <IconButton mode={BUTTON_MODE}
                                icon={editAllowed ? "check" : "pencil-outline"}
                                onPress={confirmEdit}
                                style={{backgroundColor:theme.colors.primaryContainer}}
                    />
                    <IconButton
                        mode={BUTTON_MODE}
                        icon={editAllowed ? "cancel" : "trash-can"}
                        onPress={dismissEdit}
                        style={{backgroundColor:theme.colors.errorContainer}}
                    />
                </View>
            </Surface>
        </TouchableOpacity>
    );
}