import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useState, useLayoutEffect, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { differenceInSeconds } from "date-fns";


const RDTTimer = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const insets = useSafeAreaInsets();

    const [formData, setFormData] = useState({
        bean: "",
        preheatTemp: "",
        yellowPhase: "",
        maillardPhase: "",
        firstCrack: "",
        endTime: "",
        greenWeight: "",
        endWeight: "",
        weightLoss: "",
    })
    const onChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    const recordStartTime = async () => {
        try {
            const now = new Date();
            await AsyncStorage.setItem("@start_time", now.toISOString());
        } catch (err) {
            // TODO: handle errors from setItem properly
            console.warn(err);
        }
    };


    const startTimer = () => {
        setFormData({ ...formData, yellowPhase: "", firstCrack: "", endTime: "", maillardPhase: "" });
        setRDT("");
        recordStartTime();
        runTime();
    }

    const [time, setTime] = useState(0);
    const [min, setMin] = useState("00");
    const [sec, setSec] = useState("00");
    const [timer, setTimer] = useState(0);
    const [yellowPhaseTime, setYellowPhaseTime] = useState(0);
    const [firstCrackTime, setFirstCrackTime] = useState(0);
    const [percentLimit14, setPercentLimit14] = useState(0);
    const [percentLimit14S, setPercentLimit14S] = useState("");
    const [percentLimit16, setPercentLimit16] = useState(0);
    const [percentLimit16S, setPercentLimit16S] = useState("");
    const [percentLimit18, setPercentLimit18] = useState(0);
    const [percentLimit18S, setPercentLimit18S] = useState("");
    const [percentLimit20, setPercentLimit20] = useState(0);
    const [percentLimit20S, setPercentLimit20S] = useState("");
    const [percentLimit22, setPercentLimit22] = useState(0);
    const [percentLimit22S, setPercentLimit22S] = useState("");
    const [percentLimit24, setPercentLimit24] = useState(0);
    const [percentLimit24S, setPercentLimit24S] = useState("");
    const [RDT, setRDT] = useState("");

    const runTime = async () => {
        let startTime = await AsyncStorage.getItem("@start_time");
        const temp = setInterval(() => {
            counterSecond(startTime);
        }, 1000);
        setTimer(temp);
    }
    var now;
    var temp;
    var minutes;
    var seconds;
    const counterSecond = (startTime) => {
        now = new Date();
        temp = differenceInSeconds(now, Date.parse(startTime));
        setTime(temp);
        minutes = Math.floor(temp / 60);
        seconds = temp - minutes * 60;
        setMin(minutes < 10 ? '0' + minutes : minutes);
        setSec(seconds < 10 ? '0' + seconds : seconds);
    }

    const endTimer = () => {
        onChange("endTime", min + " : " + sec)
        clearInterval(timer);
        setTimer(0);
        AsyncStorage.clear();
    }

    const yellowPhaseClick = () => {
        setYellowPhaseTime(time);
        onChange("yellowPhase", min + " : " + sec);
    }

    const firstCrackClick = () => {
        setFirstCrackTime(time);
        let maillard = time - yellowPhaseTime;
        let maillardMin = Math.floor(maillard / 60);
        let maillardSec = maillard - maillardMin * 60;
        setPercentLimits(time)
        setFormData({ ...formData, maillardPhase: ((maillardMin < 10 ? '0' + maillardMin : maillardMin) + " : " + (maillardSec < 10 ? '0' + maillardSec : maillardSec)), firstCrack: (min + " : " + sec) })
    }

    const setPercentLimits = (time) => {
        let _14 = Math.floor(time / 0.86) + 1;
        setPercentLimit14(_14);
        let _14Min = Math.floor(_14 / 60);
        let _14Sec = _14 - _14Min * 60;
        setPercentLimit14S(": " + (_14Min < 10 ? '0' + _14Min : _14Min) + " : " + (_14Sec < 10 ? '0' + _14Sec : _14Sec));

        let _16 = Math.floor(time / 0.84) + 1;
        setPercentLimit16(_16);
        let _16Min = Math.floor(_16 / 60);
        let _16Sec = _16 - _16Min * 60;
        setPercentLimit16S(": " + (_16Min < 10 ? '0' + _16Min : _16Min) + " : " + (_16Sec < 10 ? '0' + _16Sec : _16Sec));

        let _18 = Math.floor(time / 0.82) + 1;
        setPercentLimit18(_18);
        let _18Min = Math.floor(_18 / 60);
        let _18Sec = _18 - _18Min * 60;
        setPercentLimit18S(": " + (_18Min < 10 ? '0' + _18Min : _18Min) + " : " + (_18Sec < 10 ? '0' + _18Sec : _18Sec));

        let _20 = Math.floor(time / 0.8) + 1;
        setPercentLimit20(_20);
        let _20Min = Math.floor(_20 / 60);
        let _20Sec = _20 - _20Min * 60;
        setPercentLimit20S(": " + (_20Min < 10 ? '0' + _20Min : _20Min) + " : " + (_20Sec < 10 ? '0' + _20Sec : _20Sec));

        let _22 = Math.floor(time / 0.78) + 1;
        setPercentLimit22(_22);
        let _22Min = Math.floor(_22 / 60);
        let _22Sec = _22 - _22Min * 60;
        setPercentLimit22S(": " + (_22Min < 10 ? '0' + _22Min : _22Min) + " : " + (_22Sec < 10 ? '0' + _22Sec : _22Sec));

        let _24 = Math.floor(time / 0.76) + 1;
        setPercentLimit24(_24);
        let _24Min = Math.floor(_24 / 60);
        let _24Sec = _24 - _24Min * 60;
        setPercentLimit24S(": " + (_24Min < 10 ? '0' + _24Min : _24Min) + " : " + (_24Sec < 10 ? '0' + _24Sec : _24Sec));

    }

    const calculateWeightLoss = () => {
        if (formData.greenWeight !== "" && formData.endWeight !== "") {
            onChange("weightLoss", (((parseFloat(formData.greenWeight) - parseFloat(formData.endWeight)) / formData.greenWeight) * 100).toFixed(2) + "%");
        }
    }

    useEffect(() => {
        if (formData.firstCrack !== "") {
            setRDT((((time - firstCrackTime) / time) * 100).toFixed(1) + "%");
        }
    }, [time])

    return (
        <View className="relative h-screen" style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <LinearGradient
                colors={['rgb(80, 138, 191)', 'rgb(78, 136, 189)', 'rgb(35, 95, 145)']}
                className="flex-row p-2 align-top h-[80px]"
            >
                <Text className="text-slate-50 text-xl font-semibold">
                    Bean:
                </Text>
                <View>
                    <TextInput
                        className="text-slate-50 text-xl pl-2 font-semibold"
                        name="bean"
                        multiline
                        onChangeText={newText => onChange("bean", newText)}
                        value={formData.bean}
                    />
                </View>
            </LinearGradient>
            <View className="bg-[#4e94cf] p-2 flex-row w-100 justify-between">
                <TouchableOpacity className={`${timer == 0 ? "bg-[#ffc000]" : "bg-[#aa8109]"} p-1 rounded-lg h-[60px] flex justify-center w-[23%]`} disabled={timer == 0 ? false : true} onPress={() => { startTimer() }}>
                    <Text className="text-center text-lg text-black text-wrap font-semibold">START</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${formData.yellowPhase !== "" ? "bg-[#8c5222]" : "bg-[#f79646]"} p-1 rounded-lg h-[60px] flex justify-center w-[23%]`} disabled={formData.yellowPhase === "" ? false : true} onPress={() => { yellowPhaseClick() }} >
                    <Text className="text-center text-lg text-black text-wrap font-semibold leading-[25px]">YELLOW PHASE</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${formData.firstCrack === "" ? "bg-[#ffc000]" : "bg-[#aa8109]"} p-1 rounded-lg h-[60px] flex justify-center w-[23%]`} disabled={formData.firstCrack === "" ? false : true} onPress={() => { firstCrackClick() }}>
                    <Text className="text-center text-lg text-black text-wrap font-semibold leading-[25px]">FIRST CRACK</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${formData.endTime !== "" ? "bg-[#8c5222]" : "bg-[#f79646]"} p-1 rounded-lg h-[60px] flex justify-center w-[23%]`} disabled={formData.endTime === "" ? false : true} onPress={() => { endTimer() }}>
                    <Text className="text-center text-lg text-black text-wrap font-semibold">END</Text>
                </TouchableOpacity>
            </View>
            <View className="px-5 pt-5 mx-5">
                <View className="flex-row justify-between items-center">
                    <Text className="text-3xl font-bold">{min + " : " + sec}</Text>
                    <View className="flex-row items-center w-[55%]">
                        <Text className="text-xl">RDT%</Text>
                        <TextInput
                            className="text-black ml-4 text-2xl w-[90px] text-center bg-[#e1ebf3] rounded-lg border-[#62a3da] border-2"
                            value={RDT}
                        />
                    </View>
                </View>
                <View className="flex-row justify-between mt-3">
                    <Text className={`${percentLimit14 !== 0 && time >= percentLimit14 ? "text-red-700" : "text-black"} text-xl`}>14%{percentLimit14S}</Text>
                    <Text className={`${percentLimit20 !== 0 && time >= percentLimit20 ? "text-red-700" : "text-black"} text-xl w-[50%]`}>20%{percentLimit20S}</Text>
                </View>
                <View className="flex-row justify-between mt-3">
                    <Text className={`${percentLimit16 !== 0 && time >= percentLimit16 ? "text-red-700" : "text-black"} text-xl`}>16%{percentLimit16S}</Text>
                    <Text className={`${percentLimit22 !== 0 && time >= percentLimit22 ? "text-red-700" : "text-black"} text-xl w-[50%]`}>22%{percentLimit22S}</Text>
                </View>
                <View className="flex-row justify-between mt-3">
                    <Text className={`${percentLimit18 !== 0 && time >= percentLimit18 ? "text-red-700" : "text-black"} text-xl`}>18%{percentLimit18S}</Text>
                    <Text className={`${percentLimit24 !== 0 && time >= percentLimit24 ? "text-red-700" : "text-black"} text-xl w-[50%]`}>24%{percentLimit24S}</Text>
                </View>
            </View>
            <View className="p-3">
                <View className="flex-row justify-between items-center">
                    <Text className="text-xl">Preheat Temp</Text>
                    <View className="flex-row items-center w-[55%]">
                        <TextInput
                            className="text-black ml-4 text-xl w-[150px] text-center bg-[#e1ebf3] rounded-xl border-[#62a3da] border-2"
                            onChangeText={newText => onChange("preheatTemp", newText)}
                            value={formData.preheatTemp}
                        />
                        <Text className="text-xl">F/C</Text>
                    </View>
                </View>
                <View className="flex-row justify-between items-center mt-1">
                    <Text className="text-xl">Yellow Phase</Text>
                    <View className="flex-row items-center w-[55%]">
                        <TextInput
                            className="text-black ml-4 text-xl w-[150px] text-center bg-[#e1ebf3] rounded-xl border-[#62a3da] border-2"
                            disabled
                            value={formData.yellowPhase}
                        />
                        <Text className="text-xl">m/%</Text>
                    </View>
                </View>
                <View className="flex-row justify-between items-center mt-1">
                    <Text className="text-xl">Maillard Phase</Text>
                    <View className="flex-row items-center w-[55%]">
                        <TextInput
                            className="text-black ml-4 text-xl w-[150px] text-center bg-[#e1ebf3] rounded-xl border-[#62a3da] border-2"
                            disabled
                            value={formData.maillardPhase}
                        />
                        <Text className="text-xl">m/%</Text>
                    </View>
                </View>
                <View className="flex-row justify-between items-center mt-1">
                    <Text className="text-xl">First Crack</Text>
                    <View className="flex-row items-center w-[55%]">
                        <TextInput
                            className="text-black ml-4 text-xl w-[150px] text-center bg-[#e1ebf3] rounded-xl border-[#62a3da] border-2"
                            disabled
                            value={formData.firstCrack}
                        />
                        <Text className="text-xl">m</Text>
                    </View>
                </View>
                <View className="flex-row justify-between items-center mt-1">
                    <Text className="text-xl">End Time</Text>
                    <View className="flex-row items-center w-[55%]">
                        <TextInput
                            className="text-black ml-4 text-xl w-[150px] text-center bg-[#e1ebf3] rounded-xl border-[#62a3da] border-2"
                            disabled
                            value={formData.endTime}
                        />
                        <Text className="text-xl">m/%</Text>
                    </View>
                </View>
                <View className="flex-row justify-between items-center mt-1">
                    <Text className="text-xl">Green Weight</Text>
                    <View className="flex-row items-center w-[55%]">
                        <TextInput
                            className="text-black ml-4 text-xl w-[150px] text-center bg-transparent rounded-xl border-[#62a3da] border-2"
                            onChangeText={newText => onChange("greenWeight", newText)}
                            value={formData.greenWeight}
                        />
                        <Text className="text-xl">g/oz</Text>
                    </View>
                </View>
                <View className="flex-row justify-between items-center mt-1">
                    <Text className="text-xl">End Weight</Text>
                    <View className="flex-row items-center w-[55%]">
                        <TextInput
                            className="text-black ml-4 text-xl w-[150px] text-center bg-transparent rounded-xl border-[#62a3da] border-2"
                            onChangeText={newText => onChange("endWeight", newText)}
                            value={formData.endWeight}
                        />
                        <Text className="text-xl">g/oz</Text>
                    </View>
                </View>
                <View className="flex-row justify-between items-center mt-1">
                    <Text className="text-xl">Weight Loss</Text>
                    <View className="flex-row items-center w-[55%]">
                        <TextInput
                            className="text-black ml-4 text-xl w-[150px] text-center bg-transparent rounded-xl border-[#62a3da] border-2"
                            disabled
                            value={formData.weightLoss}
                        />
                        <Text className="text-xl">g/oz</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity className="bg-[#3a78a9]  px-2 py-4 absolute bottom-0 left-[32%] w-[36%]">
                <Text className="text-slate-50 text-base font-semibold text-center">SAVE PROFILE</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#6da2d4]  px-2 py-4 absolute bottom-0 right-0 w-[30%] rounded-2xl" onPress={() => calculateWeightLoss()}>
                <Text className="text-slate-50 text-base font-semibold text-center">WEIGHT LOSS</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RDTTimer