import {TextInput, Text, Button, View} from "react-native";
import {useState, useEffect} from "react";
import {styles} from "@/assets/styles";

export default function CountBlock({ title, count, countTotal, setCount, setCountTotal }: any) {
    const [value, setValue] = useState<number>(count);
    const [valueTotal, setValueTotal] = useState<number>(0);
    const increment = () => { };
    const decrement = () => { };
    const reset = () => {
    };

    return (
        <View>
            <Text>{title}</Text>

            <Text>
                How many in total?
            </Text>
            <TextInput
                keyboardType="numeric"
                placeholder="0"
                value={""+valueTotal}
            />
            <View>
                <Button onPress={decrement} title="MINUS" />
                <View>
                    <Text>{value}</Text>
                </View>
                <Button onPress={increment} title="PLUS"/>
            </View>
            <Button onPress={reset} title="RESET" />
        </View>
    );
};