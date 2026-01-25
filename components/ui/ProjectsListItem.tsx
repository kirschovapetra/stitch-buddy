import React from 'react';
import {View, TouchableOpacity} from "react-native";
import {styles} from "@/assets/styles";
import { useRouter } from 'expo-router';
import {ItemProps} from "@/assets/types";
import { Text } from 'react-native-paper';
export default function ProjectListItem ({project}: ItemProps) {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={()=>router.navigate(`/${project}`)}>
            <View style={styles.item}>
                <Text variant="bodyLarge">{project}</Text>
            </View>
        </TouchableOpacity>
    );
}
