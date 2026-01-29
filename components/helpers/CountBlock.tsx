import {View} from "react-native";
import {IconButton, Button, Text, ProgressBar} from 'react-native-paper';
import {styles} from "@/assets/styles";
import React, {useState} from "react";
import * as Haptics from 'expo-haptics';
import {NumericTextInput} from "@/components/helpers/NumericTextInput";
import {BUTTON_MODE, CountBlockProps} from "@/assets/types";

/**
 *
 * @param title
 * @param count
 * @param countTotal
 * @param setCount
 * @param setCountTotal
 * @constructor
 */
export default function CountBlock({title, count, countTotal, setCount, setCountTotal}: CountBlockProps) {
    const [progressBarKey, setProgressBarKey] = useState<number>(0);
    const increment = () => {
        if (count < (countTotal || 0)) setCount(count + 1);
        Haptics.selectionAsync().then(() => {})
    };
    const decrement = () => {
        if (count > 0) setCount(count - 1);
        Haptics.selectionAsync().then(() => {})
    };
    const reset = () => {
        setCountTotal(0);
        setCount(0);
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
                             progress={countTotal === 0 ? 0 : count / countTotal}
                />
            </View>

            <View style={styles.countBlockButtonsContainer}>
                <IconButton icon="minus" mode={BUTTON_MODE} onPress={decrement} disabled={count <= 0}/>
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
                <IconButton icon="plus" mode={BUTTON_MODE} onPress={increment} disabled={count >= countTotal}/>
            </View>
            <Button style={styles.countBlockResetButton} mode={BUTTON_MODE} onPress={reset}>Reset</Button>
        </View>
    );
};