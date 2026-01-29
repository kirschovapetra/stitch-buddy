import React, {useEffect, useState} from 'react';
import {Animated} from "react-native";
import CountBlock from "@/components/helpers/CountBlock";
import {styles} from "@/assets/styles";
import {fetchMetadataItem, getProjectDataAsync, storeDataAsync} from "@/scripts/script";
import {LoadingScreen} from "@/components/ui/LoadingScreen";
import {CustomHeader} from "@/components/helpers/CustomHeader";
import {useRouter} from "expo-router";

/**
 *
 * @param projectId
 * @constructor
 */
export default function ProjectDetail ({setTheme, projectId}: { projectId:string, setTheme:any }) {

    const [row, setRow] = useState<number>(0);
    const [rowsTotal, setRowsTotal] = useState<number>(0);
    const [stitch, setStitch] = useState<number>(0);
    const [stitchesTotal, setStitchesTotal] = useState<number>(0);
    const [metadataItem, setMetadataItem] = useState<any>();
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();

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
        <>
            {!isLoaded ? <LoadingScreen/> :
                <>
                    <CustomHeader title={`${metadataItem.name}`} setTheme={setTheme}/>
                    <Animated.ScrollView style={{...styles.mainContainer}}>
                        <>
                            <CountBlock title="Row Counter" count={row} countTotal={rowsTotal} setCount={setRow} setCountTotal={setRowsTotal}/>
                            <CountBlock title="Stitch Counter" count={stitch} countTotal={stitchesTotal} setCount={setStitch} setCountTotal={setStitchesTotal}/>
                        </>
                    </Animated.ScrollView>
                </>
            }
        </>
    );
}