import {Button, TextInput, Text, Appbar} from "react-native-paper";
import React, {useState} from "react";
import {useRouter} from "expo-router";
import {View} from "react-native";
import {styles} from "@/assets/styles";
import {v4 as uuidv4} from 'uuid';
import {addProject} from "@/scripts/script";
import {NumericTextInputFormWrapper} from "@/components/NumericTextInputFormWrapper";
import {Controller, useForm} from "react-hook-form";
import {BUTTON_MODE, ProjectForm, TEXTINPUT_MODE} from "@/assets/types";

/**
 *
 * @constructor
 */
export function AddProjectView() {
    const [row, setRow] = useState<number>(0);
    const [rowsTotal, setRowsTotal] = useState<number>(0);
    const [stitch, setStitch] = useState<number>(0);
    const [stitchesTotal, setStitchesTotal] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const router = useRouter();
    const {control, handleSubmit, formState: { errors }} = useForm<ProjectForm>()
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
                row: row || 0,
                rowsTotal: rowsTotal || 0,
                stitch: stitch || 0,
                stitchesTotal: stitchesTotal || 0
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
                        return title.length > 0 ? true : "Project Title is required.";
                    }
                }}
                render={(field) => (
                    <TextInput {...field}
                        value={title}
                        mode={TEXTINPUT_MODE}
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
                customValidation={(
                    row !== undefined &&
                    rowsTotal !== undefined &&
                    row > rowsTotal) ? "Current Row must be lesser than or equal to Total Row amount" : null
                }
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
                customValidation={(
                    stitch !== undefined &&
                    stitchesTotal !== undefined &&
                    stitch > stitchesTotal) ? "Current Stitch must be lesser than or equal to Total Stitch amount" : null}
            />

            <NumericTextInputFormWrapper
                name="stitchesTotal"
                value={stitchesTotal}
                setValue={setStitchesTotal}
                label="Stitches Total"
                errorValue={errors.stitchesTotal}
                control={control}/>

            <View style={styles.addProjectButtonsContainer}>
                <Button mode={BUTTON_MODE} onPress={handleSubmit(submitProject)}>Done</Button>
            </View>

        </View>
    );
}