import React, {useEffect, useState} from 'react';
import {Animated} from "react-native";
import CountBlock from "@/components/CountBlock";
import {Text} from 'react-native-paper';
import {styles} from "@/assets/styles";
import {fetchMetadataItem} from "@/scripts/script";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const getProjectDataAsync = async (projectId: string): Promise<any> => {
    const defaultJson = {row:0,rowsTotal:0,stitch:0,stitchesTotal:0};
    try {
        const projectData = await AsyncStorage.getItem(`project:${projectId}`);
        return projectData == null? defaultJson : JSON.parse(projectData);
    } catch (e) {
        console.error(e);
        return defaultJson;
    }
};
const storeDataAsync = async (projectId: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(`project:${projectId}`, jsonValue);
    } catch (e) {
        console.error(e);
    }
};
export default function ProjectDetail ({projectId}: { projectId:any }) {

    const [row, setRow] = useState<number>();
    const [rowsTotal, setRowsTotal] = useState<number>();
    const [stitch, setStitch] = useState<number>();
    const [stitchesTotal, setStitchesTotal] = useState<number>();
    const [metadataItem, setMetadataItem] = useState<any>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getProjectData = async () => {
            const projectData = await getProjectDataAsync(projectId);
            setRow(projectData.row);
            setRowsTotal(projectData.rowsTotal);
            setStitch(projectData.stitch);
            setStitchesTotal(projectData.stitchesTotal);
            setMetadataItem(await fetchMetadataItem(projectId));
            setIsLoaded(true);
        }
        getProjectData();
    }, [projectId]);


    useEffect(() => {
        if (!isLoaded) return;
        storeDataAsync(projectId, {row:row, rowsTotal:rowsTotal, stitch:stitch, stitchesTotal:stitchesTotal});
    }, [row, rowsTotal, stitch, stitchesTotal, projectId, isLoaded]);

    return (
        <Animated.ScrollView style={styles.mainContainer}>
            <Text variant="titleLarge" style={styles.projectTitle}>Project: {(metadataItem=== null || metadataItem === undefined) ? "":metadataItem.name}</Text>
            <CountBlock title="Row Counter" count={row} countTotal={rowsTotal} setCount={setRow} setCountTotal={setRowsTotal}/>
            <CountBlock title="Stitch Counter" count={stitch} countTotal={stitchesTotal} setCount={setStitch} setCountTotal={setStitchesTotal}/>
        </Animated.ScrollView>
    );
}