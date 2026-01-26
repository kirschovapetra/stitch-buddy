import {Button, TextInput, Text} from "react-native-paper";
import React, {useState} from "react";
import {useRouter} from "expo-router";
import {useColorScheme, View} from "react-native";
import {getTheme, styles} from "@/assets/styles";
import {v4 as uuidv4} from 'uuid';
import {addProject} from "@/scripts/script";
import {NumericTextInputFormWrapper} from "@/components/NumericTextInputFormWrapper";
import {Controller, useForm} from "react-hook-form";
import {ProjectForm} from "@/assets/types";

export function AddProjectView() {
    const [row, setRow] = useState("");
    const [rowsTotal, setRowsTotal] = useState("");
    const [stitch, setStitch] = useState("");
    const [stitchesTotal, setStitchesTotal] = useState("");
    const [title, setTitle] = useState("");
    const router = useRouter();
    const {control, handleSubmit, formState: { errors }} = useForm<ProjectForm>()
    const theme = getTheme(useColorScheme())
    const submitProject = async () => {
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
        <View style={{...styles.mainContainer}}>
            <Controller
                name="title"
                control={control}
                rules={{
                    validate: () => {
                        return title!==null && title.length > 0 ? true : "Project Title is required.";
                    }
                }}
                render={(field) => (
                    <TextInput {...field}
                        value={title}
                        mode="outlined"
                        dense
                        label={<Text>Project title<Text style={{ color: 'red' }}> *</Text></Text>}
                        onChangeText={x => setTitle(x)}
                        error={errors.title !== undefined}
                    />
                )}
            />
            {errors.title && <Text style={{ color: 'red' }}>{errors.title.message}</Text>}

            <NumericTextInputFormWrapper
                name="row"
                value={row}
                setValue={setRow}
                label="Row"
                errorValue={errors.row}
                control={control}
                customValidation={Number(row) > Number(rowsTotal) ? "Current Row must be lesser than or equal to Total Row amount" : null}
            />

            <NumericTextInputFormWrapper
                name="rowsTotal"
                value={rowsTotal}
                setValue={setRowsTotal}
                label="Rows Total"
                errorValue={errors.rowsTotal}
                control={control}/>


            <NumericTextInputFormWrapper
                name="stitch"
                value={stitch}
                setValue={setStitch}
                label="Stitch"
                errorValue={errors.stitch}
                control={control}
                customValidation={Number(stitch) > Number(stitchesTotal) ? "Current Stitch must be lesser than or equal to Total Stitch amount" : null}
            />

            <NumericTextInputFormWrapper
                name="stitchesTotal"
                value={stitchesTotal}
                setValue={setStitchesTotal}
                label="Stitches Total"
                errorValue={errors.stitchesTotal}
                control={control}/>

            <View style={styles.addProjectButtonsContainer}>

                <Button
                    mode="contained"
                    onPress={handleSubmit(submitProject)}>
                    Done
                </Button>
            </View>

        </View>
    );
}