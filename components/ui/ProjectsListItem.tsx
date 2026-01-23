import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {styles} from "@/assets/styles";
import { useRouter } from 'expo-router';
import {ItemProps} from "@/assets/types";
export default function ProjectListItem ({project}: ItemProps) {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={()=>router.navigate("/[project]")}>
            <View style={styles.item}>
                <Text style={styles.title}>{project}</Text>
            </View>
        </TouchableOpacity>
    );
}
