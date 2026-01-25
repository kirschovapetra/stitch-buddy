import React, {useEffect, useState} from 'react';
import {Animated} from "react-native";
import {styles} from "@/assets/styles";
import CountBlock from "@/components/ui/CountBlock";
import ScrollView = Animated.ScrollView;
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ItemProps, Project} from "@/assets/types";
import { Text } from 'react-native-paper';
const storeDataAsync = async (title: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(title, jsonValue);
    } catch (e) {
        console.error(e);
    }
};

const getProjectDataAsync = async (title: string): Promise<Project> => {
    const defaultJson = {row:0,rowsTotal:0,stitch:0,stitchesTotal:0};
    try {
        const jsonValue = await AsyncStorage.getItem(title);
        return jsonValue != null ? JSON.parse(jsonValue) : defaultJson;
    } catch (e) {
        console.error(e);
        return defaultJson;
    }
};
export default function ProjectDetail ({project}: ItemProps) {

    const [row, setRow] = useState<number>();
    const [rowsTotal, setRowsTotal] = useState<number>();
    const [stitch, setStitch] = useState<number>();
    const [stitchesTotal, setStitchesTotal] = useState<number>();

    useEffect(() => {
        const getProjectData = async () => {
            const projectData = await getProjectDataAsync(project);
            setRow(projectData.row);
            setRowsTotal(projectData.rowsTotal);
            setStitch(projectData.stitch);
            setStitchesTotal(projectData.stitchesTotal);
        }
        getProjectData();
    }, [project]);


    useEffect(() => {
        storeDataAsync(project, {row:row, rowsTotal:rowsTotal, stitch:stitch, stitchesTotal:stitchesTotal});
    }, [row, rowsTotal, stitch, stitchesTotal, project]);


    return (
        <ScrollView>
            <Text variant="titleMedium">{project}</Text>
            <CountBlock title="Row Counter" count={row} countTotal={rowsTotal} setCount={setRow} setCountTotal={setRowsTotal}/>
            <CountBlock title="Stitch Counter" count={stitch} countTotal={stitchesTotal} Count={setStitch} setCountTotal={setStitchesTotal}/>
        </ScrollView>
    );
}