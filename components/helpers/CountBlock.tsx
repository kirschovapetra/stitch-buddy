import {View} from "react-native";
import {IconButton, Button, Text, ProgressBar, useTheme, Card} from 'react-native-paper';
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
    const theme = useTheme()
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
    };

    return (
        <Card mode="elevated" style={{...styles.countBlockContainer,backgroundColor:theme.colors.inverseOnSurface}}>
            <Card.Title
                title={title}
                titleVariant="titleMedium"
                subtitleVariant="bodyMedium"
                titleStyle={{textAlign:"center"}}
                subtitleStyle={{textAlign:"center"}}
                subtitle="How many in total?" />
            <Card.Content>
                <NumericTextInput value={countTotal} setValue={setCountTotal}/>
                     <View style={styles.countBlockProgressBarContainer}>
                         <ProgressBar style={{borderRadius:10}}
                                     key={`${progressBarKey}`}
                                     progress={countTotal === 0 ? 0 : count / countTotal}
                                     color={theme.colors.tertiary}
                        />
                    </View>

                    <View style={styles.countBlockButtonsContainer}>

                        <IconButton icon="minus"
                                    mode={BUTTON_MODE}
                                    onPress={decrement}
                                    disabled={count <= 0}
                                    style={{backgroundColor:theme.colors.errorContainer}}
                                    iconColor={theme.colors.error}/>

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
                        <IconButton icon="plus"
                                    mode={BUTTON_MODE}
                                    onPress={increment}
                                    disabled={count >= countTotal}
                                    style={{backgroundColor:theme.colors.primaryContainer}}/>
                    </View>
                    <View style={styles.addProjectButtonsContainer}>
                        <Button mode={BUTTON_MODE} onPress={reset}>Reset</Button>
                    </View>
            </Card.Content>
        </Card>
    );
};