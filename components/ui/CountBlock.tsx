import {View} from "react-native";
import {useState, useEffect} from "react";
import {styles} from "@/assets/styles";
import { IconButton, Button, Text, TextInput } from 'react-native-paper';

export default function CountBlock({ title, count, countTotal, setCount, setCountTotal }: any) {
    const [value, setValue] = useState<number>(count);
    const [valueTotal, setValueTotal] = useState<number>(0);
    const increment = () => { };
    const decrement = () => { };
    const reset = () => {
    };

    return (
        <View>
            <Text variant="titleMedium">{title}</Text>

            <Text variant="bodyMedium">
                How many in total?
            </Text>
            <TextInput
                keyboardType="numeric"
                placeholder="0"
                value={""+valueTotal}
                mode="outlined"
                dense
            />
            <View>
                <IconButton icon="minus" mode="contained" onPress={() => console.log('Pressed Minus')}/>
                <View>
                    <Text variant="bodyMedium">{value}</Text>
                </View>
                <IconButton icon="plus" mode="contained" onPress={() => console.log('Pressed Plus')}/>
            </View>
            <Button mode="contained" onPress={() => console.log('Pressed Reset')}>Reset</Button>

        </View>
    );
};