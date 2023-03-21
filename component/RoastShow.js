import { View, Text } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { arMA } from 'date-fns/locale';

const RoastShow = ({ navigation }) => {

    const [data, setData] = useState({});
    const getData = async () => {
        let data = await AsyncStorage.getItem("roast_data");
        setData(JSON.parse(data));
    }

    useEffect(() => {
        getData();
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const insets = useSafeAreaInsets();

    return (
        <View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <View className="h-screen p-3 flex justify-center">
                <View className="bg-white shadow-lg shadow-black p-2">
                    <Text className="font-semibold text-[18px]">Name: {data.name}</Text>
                    <Text className="text-[18px]">{`Temperature: ${data.temperature}\nYellow Phase: ${data.yellowPhase}\nMaillardPhase: ${data.maillardPhase}\nFirst Crack: ${data.firstCrack}\nEnd Time: ${data.endTime}\nGreen Weight: ${data.greenWeight}\nEnd Weight: ${data.endWeight}\nWeight Loss: ${data.weightLoss}`}</Text>
                </View>
            </View>
        </View>
    )
}

export default RoastShow