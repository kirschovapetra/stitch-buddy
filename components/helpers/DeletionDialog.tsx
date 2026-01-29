import React from "react";
import {Portal, Button,  Text, Dialog} from "react-native-paper";
import {styles} from "@/assets/styles";
import {DeletionDialogProps} from "@/assets/types";

/**
 *
 * @param visible
 * @param confirm
 * @param item
 * @param dismissDialog
 * @constructor
 */
export function DeletionDialog({visible, confirm, item, dismissDialog}: DeletionDialogProps) {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={dismissDialog}>
                <Dialog.Content>
                    <Text variant="bodyMedium" style={styles.projectListItemTextContainer}>
                        Are you sure you want to delete project: <Text variant="bodyLarge"><b>{item !== undefined? item.name:""}</b></Text>?
                    </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={confirm}>YES</Button>
                    <Button onPress={dismissDialog}>NO</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}