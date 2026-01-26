import {View} from "react-native";
import {IconButton, Button, Text, ProgressBar} from 'react-native-paper';
import {styles} from "@/assets/styles";
import React, {useState} from "react";
import * as Haptics from 'expo-haptics';
import {NumericTextInput} from "@/components/NumericTextInput";

export default function CountBlock({title, count, countTotal, setCount, setCountTotal}: {title:any,count:any,countTotal:any,setCount:any,setCountTotal:any}) {
    const [progressBarKey, setProgressBarKey] = useState(0);
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

    return (
        <View style={styles.mainContainer}>
            <Text variant="titleMedium" style={styles.centerTextContainer}>{title}</Text>

            <Text variant="bodyMedium" style={styles.centerTextContainer}>
                How many in total?
            </Text>

            <NumericTextInput value={countTotal} setValue={setCountTotal}/>

            <View style={styles.countBlockProgressBarContainer}>
                <ProgressBar style={{borderRadius:10}}
                             key={`${progressBarKey}`}
                             progress={Number(countTotal) === 0 ? 0 : Number(count) / Number(countTotal)}
                />
            </View>

            <View style={styles.countBlockButtonsContainer}>
                <IconButton icon="minus" mode="contained" onPress={decrement} disabled={Number(count) <= 0}/>
                <View style={styles.centerTextContainer}>
                    <NumericTextInput
                        value={count}
                        setValue={setCount}
                        style={styles.centerTextInput}
                        onBlur={() => {
                            if (count > countTotal) {
                                setCount(0);
                                setProgressBarKey(Math.random())
                            }}
                        }
                    />
                </View>
                <IconButton icon="plus" mode="contained" onPress={increment} disabled={Number(count) >= Number(countTotal)}/>
            </View>
            <Button style={styles.countBlockResetButton} mode="contained" onPress={reset}>Reset</Button>
        </View>
    );
};