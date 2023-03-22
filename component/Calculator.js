import { View, Text, ScrollView, KeyboardAvoidingView, TextInput, Platform } from 'react-native'
import { useState, useLayoutEffect, useEffect } from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

const Calculator = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const insets = useSafeAreaInsets();

    const [coffeeAmount, setCoffeeAmount] = useState("");
    const [ratio, setRatio] = useState("");
    const [water, setWater] = useState("");

    useEffect(() => {
        if (coffeeAmount !== "" && ratio !== "") {
            let temp = parseFloat(coffeeAmount) * parseFloat(ratio);
            setWater(temp.toString());
        }
        else {
            setWater("");
        }
    }, [coffeeAmount, ratio])

    const [FC, setFC] = useState("");
    const [RDT, setRDT] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
        if (FC !== "" && RDT !== "") {
            let min = FC.substring(0, FC.indexOf(":"));
            let sec = FC.substring(FC.indexOf(":") + 1, FC.length);
            // alert(parseFloat(min) + parseFloat(sec));
            let temp = Math.floor((parseFloat(min) * 60 + parseFloat(sec)) / (1 - parseFloat(RDT) / 100));
            let endTimeMin = Math.floor(temp / 60);
            let endTimeSec = temp - endTimeMin * 60;
            setEndTime(endTimeMin + ":" + endTimeSec);
        }
        else if (FC !== "" && RDT === "") {
            setEndTime(FC);
        }
        else if (FC === "") {
            setEndTime("");
        }
    }, [FC, RDT])

    return (
        <View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? 'padding' : "height"}>
                <View className="h-full bg-[#4e94cf]">
                    <View className="h-[50%]">
                        <LinearGradient
                            colors={['rgb(80, 138, 191)', 'rgb(78, 136, 189)', 'rgb(35, 95, 145)']}
                            className="flex justify-center p-2 align-top h-[80px] w-full"
                        >
                            <Text className="text-slate-50 justify-center text-3xl font-semibold text-center">Brew Ratio Calculator</Text>
                        </LinearGradient>
                        <View className="flex-1 justify-center">
                            <View className="mt-5 h-min">
                                <ScrollView>
                                    <View className="flex-1 items-center">
                                        <View className="flex-row items-center">
                                            <TextInput
                                                className="bg-white rounded-sm text-xl w-[100px] p-1 mr-1"
                                                onChangeText={newText => setCoffeeAmount(newText)}
                                                value={coffeeAmount}
                                            />
                                            <Text className="bg-blue-600 text-slate-50 text-xl font-semibold p-1 rounded-sm w-[100px]">g Coffee</Text>
                                        </View>
                                        <View className="flex-row items-center mt-2">
                                            <TextInput
                                                className="bg-white rounded-sm text-xl w-[100px] p-1 mr-1"
                                                onChangeText={newText => setRatio(newText)}
                                                value={ratio}
                                            />
                                            <Text className="bg-blue-600 text-slate-50 text-xl font-semibold p-1 rounded-sm w-[100px]">ratio</Text>
                                        </View>
                                        <View className="flex-row items-center mt-2">
                                            <TextInput
                                                className="bg-white rounded-sm text-xl w-[100px] p-1 mr-1"
                                                disabled
                                                value={water}
                                            />
                                            <Text className="bg-blue-600 text-slate-50 text-xl font-semibold p-1 rounded-sm w-[100px]"
                                            >g Water</Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                    <View className="flex-1">
                        <LinearGradient
                            colors={['rgb(80, 138, 191)', 'rgb(78, 136, 189)', 'rgb(35, 95, 145)']}
                            className="flex justify-center p-2 align-top h-[80px] w-full"
                        >
                            <Text className="text-slate-50 justify-center text-3xl font-semibold text-center">Development/End Time Calculator</Text>
                        </LinearGradient>
                        <View className="flex-auto justify-center">
                            <View className="mt-5 h-min">
                                <ScrollView>
                                    <View className="flex-1 items-center">
                                        <View className="flex-row items-center">
                                            <TextInput
                                                className="bg-white rounded-sm text-xl w-[100px] p-1 mr-1"
                                                onChangeText={newText => setFC(newText)}
                                                value={FC}
                                            />
                                            <Text className="bg-blue-600 text-slate-50 text-xl font-semibold p-1 rounded-sm w-[100px]">FC</Text>
                                        </View>
                                        <View className="flex-row items-center mt-2">
                                            <TextInput
                                                className="bg-white rounded-sm text-xl w-[100px] p-1 mr-1"
                                                onChangeText={newText => setRDT(newText)}
                                                value={RDT}
                                            />
                                            <Text className="bg-blue-600 text-slate-50 text-xl font-semibold p-1 rounded-sm w-[100px]">RDT %</Text>
                                        </View>
                                        <View className="flex-row items-center mt-2">
                                            <TextInput
                                                className="bg-white rounded-sm text-xl w-[100px] p-1 mr-1"
                                                disabled
                                                value={endTime}
                                            />
                                            <Text className="bg-blue-600 text-slate-50 text-xl font-semibold p-1 rounded-sm w-[100px]">End Time</Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Calculator