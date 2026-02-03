import AsyncStorage from "@react-native-async-storage/async-storage";
import {Project, ProjectMetadata, SORT_BY, SORT_DIRECTION} from "@/assets/types";

/**
 * Stores a new project and adds its metadata to storage.
 *
 * @param metadata Project metadata entry
 * @param value Full project data
 */
export const addProject = async (metadata:ProjectMetadata, value:Project) => {
    try {
        const currentId = `project:${metadata.id}`;
        await fetchMetadata().then(async (metadataArray)=>{
            metadataArray.push(metadata);
            await AsyncStorage.setItem('metadata',JSON.stringify(metadataArray));
        });
        await AsyncStorage.setItem(currentId,JSON.stringify(value));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Fetches all stored project metadata.
 *
 * @returns Array of project metadata
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
 * Renames an existing project and updates its timestamp.
 *
 * @param id Project ID
 * @param name New project name
 */
export const renameProject = async (id: string, name: string) => {
    await fetchMetadata()
        .then(async (metadata) => {
            const found = metadata.filter((item) => item.id === id)[0]
            const idx = metadata.indexOf(found)
            if (idx !== -1) {
                found.name = name;
                found.updatedAt = new Date()
                metadata[idx] = found;
                await AsyncStorage.setItem('metadata', JSON.stringify(metadata));
            }
        })
        .catch((e) => console.error(e));
}

/**
 * Fetches a raw value from AsyncStorage.
 *
 * @param key Storage key
 * @param defaultValue Value returned if key is missing
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
 * Fetches metadata for a single project.
 *
 * @param id Project ID
 */
export const fetchMetadataItem = async (id:string) => {
    const defaultMetaItem = {
        id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
    }
    return await fetchMetadata()
        .then((metadata) => {
            return metadata.filter((item) => item.id === id)[0]})
        .catch(() => {return defaultMetaItem});

}

/**
 * Loads stored project data.
 *
 * @param projectId Project ID
 */
export const getProjectDataAsync = async (projectId: string): Promise<Project> => {
    const defaultJson = {row:0,rowsTotal:0,stitch:0,stitchesTotal:0};
     return await AsyncStorage.getItem(`project:${projectId}`)
         .then((projectData)=>{
             return projectData == null? defaultJson : JSON.parse(projectData)})
         .catch(e=>{
             console.error(e);
             return defaultJson;
    });
};

/**
 * Persists project data and updates metadata timestamp.
 *
 * @param projectId Project ID
 * @param value Project data
 */
export const storeDataAsync = async (projectId: string, value: Project) => {
    await AsyncStorage.setItem(`project:${projectId}`, JSON.stringify(value));
    await fetchMetadata()
        .then(async (metadata) => {
            const found = metadata.filter((item) => item.id === projectId)[0]
            const idx = metadata.indexOf(found);
            if (idx !== -1) {
                found.updatedAt = new Date();
                metadata[idx] = found;
                await AsyncStorage.setItem('metadata',JSON.stringify(metadata));
            }
        })
        .catch((e) => {console.log(e)});
};

/**
 * Comparator factory for sorting project metadata.
 *
 * @param sortByProperty Property to sort by
 * @param direction Sort direction
 */
export const compare = (sortByProperty?:string|SORT_BY, direction?:string|SORT_DIRECTION) => {
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
    };

