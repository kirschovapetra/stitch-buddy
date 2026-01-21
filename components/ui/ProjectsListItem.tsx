import React from 'react';
import {View, Text} from "react-native";
import {styles} from "@/assets/styles";

type ItemProps = {title: string};
export default function ProjectListItem ({title}: ItemProps) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}
