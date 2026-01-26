import {View} from "react-native";
import {IconButton, Button, Text, ProgressBar} from 'react-native-paper';
import {styles} from "@/assets/styles";
import React, {useEffect, useState} from "react";
import * as Haptics from 'expo-haptics';
import {NumericTextInput} from "@/components/NumericTextInput";
import {useForm} from "react-hook-form";
import {ProjectForm} from "@/assets/types";

export default function CountBlock({title, count, countTotal, setCount, setCountTotal}: {title:any,count:any,countTotal:any,setCount:any,setCountTotal:any}) {
    const [progress, setProgress] = useState<number>(0);
    const {control, handleSubmit, formState: { errors }} = useForm<ProjectForm>()
    const increment = () => {
        if (Number(count) < (Number(countTotal) || 0)) setCount(Number(count) + 1);
        Haptics.selectionAsync()
    };
    const decrement = () => {
        if (Number(count) > 0) setCount(Number(count) - 1);
        Haptics.selectionAsync()
    };
    const reset = () => {
        setCountTotal("0");
        setCount("0");
        alert("Reset successful")
    };

    useEffect(()=> {
        setProgress(Number(countTotal) === 0? 0: Number(count) / Number(countTotal))
    },[count, countTotal])

    return (
        <View style={styles.mainContainer}>
            <Text variant="titleMedium" style={styles.centerTextContainer}>{title}</Text>

            <Text variant="bodyMedium" style={styles.centerTextContainer}>
                How many in total?
            </Text>
            {/*<TextInput*/}
            {/*    value={countTotal}*/}
            {/*    mode="outlined"*/}
            {/*    dense*/}
            {/*    render={(props) => <NativeTextInput {...props} keyboardType="numeric"/>}*/}
            {/*    onChangeText={x=>setCountTotal(x)}*/}
            {/*/>*/}

            <NumericTextInput
                name="rowsTotal"
                value={countTotal}
                setValue={setCountTotal}
                label="Rows Total"
                errorValue={errors.rowsTotal}
                control={control}/>

            <View style={styles.countBlockProgressBarContainer}>
                <ProgressBar animatedValue={progress} style={{borderRadius:10}}/>
            </View>

            <View style={styles.countBlockButtonsContainer}>
                <IconButton icon="minus" mode="contained" onPress={decrement} disabled={Number(count) <= 0}/>
                <View style={styles.centerTextContainer}>
                    {/*<TextInput*/}
                    {/*    value={count}*/}
                    {/*    onChangeText={x=> setCount(x)}*/}
                    {/*    style={styles.centerTextInput}*/}
                    {/*    error={Number(count) > Number(countTotal) || Number(count) < 0}*/}
                    {/*/>*/}

                    <NumericTextInput
                        name="row"
                        value={count}
                        setValue={setCount}
                        label="Row"
                        errorValue={errors.row}
                        control={control}
                        customValidation={Number(count) > Number(countTotal) ? "Current Row must be lesser than or equal to Total Row amount" : null}
                    />
                </View>
                <IconButton icon="plus" mode="contained" onPress={increment} disabled={Number(count) >= Number(countTotal)}/>
            </View>
            <Button style={styles.countBlockResetButton} mode="contained" onPress={reset}>Reset</Button>
        </View>
    );
};