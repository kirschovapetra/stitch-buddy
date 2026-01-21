import {FlatList} from "react-native";
import ProjectListItem from "@/components/ui/ProjectsListItem";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchAllProjects = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        return await AsyncStorage.multiGet(keys);
        // const obj = Object.fromEntries(result);
        // // obj be like {"key1": "value 1", "key2": "value 2", .....}
        // // Now parse the
        // Object.keys(obj).forEach(key => {
        //     obj[key] = JSON.parse(obj[key]);

            // return result.map(req => JSON.parse(req)).forEach(console.log);
    } catch (error) {
        console.error(error)
    }
}

// const DATA = [
//     {
//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         title: 'First Item',
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         title: 'Second Item',
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         title: 'Third Item',
//     },
//     {
//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         title: 'First Item',
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         title: 'Second Item',
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         title: 'Third Item',
//     },
//     {
//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         title: 'First Item',
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         title: 'Second Item',
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         title: 'Third Item',
//     },
//     {
//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         title: 'First Item',
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         title: 'Second Item',
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         title: 'Third Item',
//     },
// ];

export default function ProjectsList() {
    return (
        <FlatList
            data={fetchAllProjects()}
            renderItem={({item}) => <ProjectListItem title={item.title}/>}
            keyExtractor={item => item.id}
        />
    );
}