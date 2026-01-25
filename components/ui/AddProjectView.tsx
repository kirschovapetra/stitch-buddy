import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button, TextInput, Text, HelperText} from "react-native-paper";
import React, {useState} from "react";
import {Project} from "@/assets/types";
import {Router, useRouter} from "expo-router";
import { View } from "react-native";
import {styles} from "@/assets/styles";
export const addProject = async (title:string, value:Project) => {

    try {
        await AsyncStorage.setItem(title,JSON.stringify(value));
    } catch (e) {
        console.error(e);
    }

};

export const done = async (router:Router, title:string, row:string, rowsTotal:string, stitch:string, stitchesTotal:string) => {

    await addProject(title, {
        row: Number(row || "0"),
        rowsTotal: Number(rowsTotal || "0"),
        stitch: Number(stitch || "0"),
        stitchesTotal: Number(stitchesTotal || "0")
    });
    router.navigate("/");
}

export function AddProjectView() {
    const [wasClicked, setWasClicked] = useState(false);
    const [row, setRow] = useState("");
    const [rowsTotal, setRowsTotal] = useState("");
    const [stitch, setStitch] = useState("");
    const [stitchesTotal, setStitchesTotal] = useState("");
    const [title, setTitle] = useState("");
    const router = useRouter();

    const hasErrors = () => {
        console.log(title);
        return title === null || title.length === 0;
    };

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
                    onPress={() => {
                        setWasClicked(true);
                        console.log(hasErrors());
                        if (!hasErrors())
                            done(router, title, row, rowsTotal, stitch, stitchesTotal);
                    }}>
                    Done
                </Button>
            </View>

        </View>
    );
}