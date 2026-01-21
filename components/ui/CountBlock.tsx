import {TextInput, Text, View} from "react-native";
import {styles} from "@/assets/styles";

export default function CountBlock({ title, itemKey }: any) {
    // const screenWidth = Dimensions.get('window').width;
    // const [count, setCount] = useState(0);
    // const [totalCount, setTotalCount] = useState(0);
    // const [loading, setLoading] = useState(true);  // Add loading state
    // const [progress, setProgress] = useState(0);  // Add loading state

    // const increment = () => { if (count < (totalCount || 0)) setCount(count + 1); };
    // const decrement = () => { if (count > 0) setCount(count - 1); };
    // const reset = () => {
    //     setTotalCount(0);
    //     setCount(0);
    // };
    // useEffect(() => {
    //     const loadDataAsync = async () => {
    //         const loadedTotalCount = await loadData(`${itemKey}_total`);
    //         const loadedCount = await loadData(itemKey);
    //
    //         // Update both count and totalCount in sequence
    //         setTotalCount(loadedTotalCount);
    //         setCount(loadedCount);
    //
    //         setLoading(false);  // Set loading to false once data is loaded
    //     };
    //
    //     loadDataAsync();
    // }, [itemKey]); // Depend on itemKey so it reloads if the itemKey changes
    // useEffect(() => {
    //     if (!loading) {  // Only store data after loading is complete
    //         storeData(itemKey, count);
    //         storeData(`${itemKey}_total`, totalCount);
    //
    //         const safeTotal = totalCount === 0 ? 1 : totalCount;
    //         setProgress(count / safeTotal);
    //     }
    // }, [count, totalCount, loading, itemKey]);
    //
    // if (loading) {
    //     return <Text>Loading...</Text>;  // Show loading text until data is loaded
    // }

    return (
        <View>
            <Text>{title}</Text>

            <Text>
                How many in total?
            </Text>
            <TextInput
                keyboardType="numeric"
                placeholder="0"
            />

            <View>


                <Text>MINUS</Text>
                <View>
                    <Text>count</Text>
                </View>

                <Text>PLUS</Text>
            </View>
            <Text>RESET</Text>
        </View>
    );
};