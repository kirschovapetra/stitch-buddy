import {Button, TextInput, Text, HelperText} from "react-native-paper";
import React, {useState} from "react";
import {Router, useRouter} from "expo-router";
import { View } from "react-native";
import {styles} from "@/assets/styles";
import {v4 as uuidv4} from 'uuid';
import {addProject} from "@/scripts/script";

export function AddProjectView() {
    const [wasClicked, setWasClicked] = useState(false);
    const [row, setRow] = useState("");
    const [rowsTotal, setRowsTotal] = useState("");
    const [stitch, setStitch] = useState("");
    const [stitchesTotal, setStitchesTotal] = useState("");
    const [title, setTitle] = useState("");
    const router = useRouter();

    const hasErrors = () => {
        return title === null || title.length === 0;
    };

    const submitProject = async () => {

        setWasClicked(true);

        if (hasErrors()) return;

        const uuid = uuidv4();
        const timestamp =new Date();

        await addProject({
                id: uuid,
                name: title,
                createdAt: timestamp,
                updatedAt: timestamp,
            },
            {
                row: Number(row || "0"),
                rowsTotal: Number(rowsTotal || "0"),
                stitch: Number(stitch || "0"),
                stitchesTotal: Number(stitchesTotal || "0")
            });
        router.navigate("/");
    }


    return (
        <View style={styles.mainContainer}>
            <TextInput
                value={title}
                mode="outlined"
                dense
                label={<Text>Project title<Text style={{ color: 'red' }}> *</Text></Text>}
                onChangeText={x => setTitle(x)}
            />
            <TextInput
                keyboardType="numeric"
                value={row}
                mode="outlined"
                dense
                label="Current row"
                onChangeText={x => setRow(x)}
            />
            <TextInput
                keyboardType="numeric"
                value={rowsTotal}
                mode="outlined"
                dense
                label="Rows total"
                onChangeText={x => setRowsTotal(x)}
            />
            <TextInput
                keyboardType="numeric"
                value={stitch}
                mode="outlined"
                dense
                label="Current stitch"
                onChangeText={x => setStitch(x)}
            />
            <TextInput
                keyboardType="numeric"
                value={stitchesTotal}
                mode="outlined"
                dense
                label="Stitches per Row total"
                onChangeText={x => setStitchesTotal(x)}
            />

            <HelperText type="error" visible={wasClicked && hasErrors()} padding="none" style={styles.addProjectButtonsContainer}>
                Project title is required
            </HelperText>
            <View style={styles.addProjectButtonsContainer}>

                <Button
                    mode="contained"
                    onPress={submitProject}>
                    Done
                </Button>
            </View>

        </View>
    );
}