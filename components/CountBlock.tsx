import {View} from "react-native";
import { IconButton, Button, Text, TextInput } from 'react-native-paper';
import {styles} from "@/assets/styles";

export default function CountBlock({title, count, countTotal, setCount, setCountTotal}: {title:any,count:any,countTotal:any,setCount:any,setCountTotal:any}) {
    const increment = () => {
        if (Number(count) < (Number(countTotal) || 0)) setCount(Number(count) + 1);
    };
    const decrement = () => {
        if (Number(count) > 0) setCount(Number(count) - 1);
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
            <TextInput
                keyboardType="numeric"
                value={countTotal}
                mode="outlined"
                dense
                onChangeText={x=>setCountTotal(x)}
            />
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