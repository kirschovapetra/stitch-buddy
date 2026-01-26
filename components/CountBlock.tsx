import {View} from "react-native";
import {IconButton, Button, Text, TextInput, ProgressBar} from 'react-native-paper';
import {styles} from "@/assets/styles";
import {useEffect, useState} from "react";
import * as Haptics from 'expo-haptics';

export default function CountBlock({title, count, countTotal, setCount, setCountTotal}: {title:any,count:any,countTotal:any,setCount:any,setCountTotal:any}) {
    const [progress, setProgress] = useState<number>(0);
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
            <TextInput
                keyboardType="numeric"
                value={countTotal}
                mode="outlined"
                dense
                onChangeText={x=>setCountTotal(x)}
            />
            <View style={styles.countBlockProgressBarContainer}>
                <ProgressBar animatedValue={progress} style={{borderRadius:10}}/>
            </View>

            <View style={styles.countBlockButtonsContainer}>
                <IconButton icon="minus" mode="contained" onPress={decrement} disabled={Number(count) <= 0}/>
                <View style={styles.centerTextContainer}>
                    <TextInput
                        keyboardType="numeric"
                        value={count}
                        dense
                        onChangeText={x=> setCount(x)}
                        style={styles.centerTextInput}
                        error={Number(count) > Number(countTotal) || Number(count) < 0}
                    />
                </View>
                <IconButton icon="plus" mode="contained" onPress={increment} disabled={Number(count) >= Number(countTotal)}/>
            </View>
            <Button style={styles.countBlockResetButton} mode="contained" onPress={reset}>Reset</Button>
        </View>
    );
};