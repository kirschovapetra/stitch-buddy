import {View} from "react-native";
import {IconButton, Button, ProgressBar, useTheme, Card} from 'react-native-paper';
import {styles} from "@/assets/styles";
import React, {useState} from "react";
import * as Haptics from 'expo-haptics';
import {NumericTextInput} from "@/components/helpers/NumericTextInput";
import {BUTTON_MODE, CountBlockProps} from "@/assets/types";

/**
 * Counter block with progress bar and increment/decrement controls.
 *
 * @param title Block title
 * @param count Current value
 * @param countTotal Max value
 * @param setCount Setter for count
 * @param setCountTotal Setter for total
 * @constructor
 */
export default function CountBlock({title, count, countTotal, setCount, setCountTotal}: CountBlockProps) {
    const [progressBarKey, setProgressBarKey] = useState<number>(0);
    const theme = useTheme()
    const increment = () => {
        Haptics.selectionAsync().then(() => {
            if (count < (countTotal || 0)) setCount(count + 1);
        })
    };
    const decrement = () => {
        Haptics.selectionAsync().then(() => {
            if (count > 0) setCount(count - 1);
        })
    };
    const reset = () => {
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        ).then(()=>{
            setCountTotal(0);
            setCount(0);
        })
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