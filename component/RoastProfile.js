import { View, Text, TouchableOpacity } from 'react-native'
import { useState, useLayoutEffect, useEffect } from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { database } from "./Database";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoastProfile = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        database.getRoastProfiles(setDataFromDB);
    }, []);

    const setDataFromDB = (data) => {
        setData(data);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const insets = useSafeAreaInsets();

    const goToRoastShowPage = async (index) => {
        try {
            await AsyncStorage.setItem("roast_data", JSON.stringify(data[index]));
        } catch (err) {
            console.log(err);
        }
        navigation.navigate("RoastShow");
    }

    return (
        <View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <View className="p-4">
                {data.map((item, index) => {
                    return (
                        <TouchableOpacity className="mt-3 p-4 bg-white w-full flex flex-row items-center" key={index} onPress={() => { goToRoastShowPage(index) }}>
                            <View className="flex-auto">
                                <Text className="font-bold text-lg">Name:{item.name}</Text>
                                <Text>{item.createdDate}</Text>
                            </View>
                            <TouchableOpacity className="mr-5">
                                <SimpleLineIcons name="pencil" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <FontAwesome name="close" size={30} color="red" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    )
}

export default RoastProfile