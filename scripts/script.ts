import AsyncStorage from "@react-native-async-storage/async-storage";
import {Project, ProjectMetadata, SORT_BY, SORT_DIRECTION} from "@/assets/types";

/**
 *
 * @param metadata
 * @param value
 */
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

/**
 *
 */
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

/**
 *
 * @param key
 * @param defaultValue
 */
export const fetchKey = async (key:string, defaultValue?:string) => {
    try {
        return await AsyncStorage.getItem(key) || defaultValue;
    } catch (e) {
        console.error(e);
        return defaultValue;
    }
};

/**
 *
 * @param id
 */
export const fetchMetadataItem = async (id:string) => {
    const currentMetadata =await fetchMetadata();
    return currentMetadata.filter((item) => item.id === id)[0] || {
        id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
    };
}

/**
 *
 * @param projectId
 */
export const getProjectDataAsync = async (projectId: string): Promise<Project> => {
    const defaultJson = {row:0,rowsTotal:0,stitch:0,stitchesTotal:0};
    try {
        const projectData = await AsyncStorage.getItem(`project:${projectId}`);
        return projectData == null? defaultJson : JSON.parse(projectData);
    } catch (e) {
        console.error(e);
        return defaultJson;
    }
};

/**
 *
 * @param projectId
 * @param value
 */
export const storeDataAsync = async (projectId: string, value: Project) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(`project:${projectId}`, jsonValue);
        const metadata =  await fetchMetadata();
        const found =  await fetchMetadataItem(projectId);
        const idx = metadata.indexOf(found);
        if (idx !== -1) {
            found.updatedAt = new Date();
            metadata[idx] = found;
            await AsyncStorage.setItem('metadata',JSON.stringify(metadata));
        }
    } catch (e) {
        console.error(e);
    }
};

/**
 *
 * @param sortByProperty
 * @param direction
 */
export const compare = (sortByProperty:SORT_BY, direction:SORT_DIRECTION) => {
        const sortOrder = direction === SORT_DIRECTION.ASC? 1 : -1;
        let property= "name";
        switch(sortByProperty) {
            case SORT_BY.NAME:
                property= "name";
                break;
            case SORT_BY.CREATED:
                property= "createdAt";
                break;
            case SORT_BY.UPDATED:
                property= "updatedAt";
                break;
            default:
                property= "name";
        }
    return function (a:any,b:any) {
            const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
