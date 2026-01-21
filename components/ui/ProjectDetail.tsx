import React from 'react';
import {View, Animated} from "react-native";
import {styles} from "@/assets/styles";
import CountBlock from "@/components/ui/CountBlock";
import ScrollView = Animated.ScrollView;
import AsyncStorage from "@react-native-async-storage/async-storage";

// const storeData = async (title: string, value: any) => {
//     try {
//         const jsonValue = JSON.stringify(value);
//         await AsyncStorage.setItem(title, jsonValue);
//     } catch (e) {
//         console.error(e);
//     }
// };

const getData = async (title: string): Promise<any> => {
    try {
        const jsonValue = await AsyncStorage.getItem(title);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e);
        return 0;
    }
};


export default function ProjectDetail (title: string) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <CountBlock title="Row Counter" itemKey="row" />
            <View />
            <CountBlock title="Stitch Counter" itemKey="stitch" />
        </ScrollView>
    );
}