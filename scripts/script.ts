import AsyncStorage from "@react-native-async-storage/async-storage";
import {Project, ProjectMetadata} from "@/assets/types";

export const addProject = async (metadata:ProjectMetadata, value:Project) => {
    try {

        const currentId = `project:${metadata.id}`;

        if (await AsyncStorage.getItem(currentId)!== null) {
            console.log(`Project with id:${currentId} already exists`)
            return;
        }
        const metadataArray = await fetchMetadata()
        metadataArray.push(metadata);
        await AsyncStorage.setItem('metadata',JSON.stringify(metadataArray));
        await AsyncStorage.setItem(currentId,JSON.stringify(value));
    } catch (e) {
        console.error(e);
    }
};


export const fetchMetadata = async () => {
    const defaultJson = { id: "", name: "", createdAt: "", updatedAt: ""};
    try {
        const currentMetadata = await AsyncStorage.getItem("metadata") || "[]";
        const metadataParsed = JSON.parse(currentMetadata) || defaultJson;
        return [...metadataParsed];
    } catch (e) {
        console.error(e);
        return [defaultJson];
    }
};

export const fetchMetadataItem = async (id:string) => {
    const currentMetadata =await fetchMetadata();
    return currentMetadata.filter((item) => item.id === id)[0] || {
        id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
    };
}
