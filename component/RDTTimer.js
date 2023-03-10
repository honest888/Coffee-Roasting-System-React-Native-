import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInSeconds } from "date-fns";


const RDTTimer = () => {
    const [formData, setFormData] = useState({
        bean: "ssSASAS"
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
        recordStartTime();
        runTime();
    }



    const [text, setText] = useState("");
    const [time, setTime] = useState(0);
    const [min, setMin] = useState("00");
    const [sec, setSec] = useState("00");
    const [timer, setTimer] = useState(0);

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
        clearInterval(timer);
        setTimer(0);
        AsyncStorage.clear();
    }

    return (
        <View>
            <LinearGradient
                colors={['rgb(80, 138, 191)', 'rgb(78, 136, 189)', 'rgb(35, 95, 145)']}
                className="flex-row p-2 align-top h-[80px]"
            >
                <Text className="text-slate-50 text-xl font-semibold">
                    Bean:
                </Text>
                <View>
                    <TextInput
                        className="text-slate-50 text-xl pl-2 font-semibold "
                        multiline
                        onChangeText={newText => setText(newText)}
                        value={text}
                    />
                </View>
            </LinearGradient>
            <View className="bg-[#4e94cf] p-2 flex-row w-100 justify-between">
                <TouchableOpacity className={`${timer == 0 ? "bg-[#ffc000]" : "bg-[#aa8109]"} p-1 rounded-lg h-[60px] flex justify-center w-[23%]`} disabled={timer == 0 ? false : true} onPress={() => { startTimer() }}>
                    <Text className="text-center text-lg text-black text-wrap font-semibold">START</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#f79646] p-1 rounded-lg h-[60px] flex justify-center w-[23%]">
                    <Text className="text-center text-lg text-black text-wrap font-semibold leading-[25px]">YELLOW PHASE</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#ffc000] p-1 rounded-lg h-[60px] flex justify-center w-[23%]">
                    <Text className="text-center text-lg text-black text-wrap font-semibold leading-[25px]">FIRST CRACK</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#f79646] p-1 rounded-lg h-[60px] flex justify-center w-[23%]" onPress={() => { endTimer() }}>
                    <Text className="text-center text-lg text-black text-wrap font-semibold">END</Text>
                </TouchableOpacity>
            </View>
            <View className="p-5 mx-4">
                <View className="flex-row justify-between items-center">
                    <Text className="text-3xl font-bold">{min + " : " + sec}</Text>
                    <View className="flex-row items-center w-[55%]">
                        <Text className="text-xl">RDT%</Text>
                        <TextInput
                            className="text-black ml-4 text-2xl px-5 bg-[#e1ebf3] rounded-lg border-[#62a3da] border-2"
                            disabled
                            onChangeText={newText => setText(newText)}
                            value={"30%"}
                        />
                    </View>
                </View>
                <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-3xl font-bold">{min + " : " + sec}</Text>
                    <View className="flex-row items-center w-[50%]">
                        <Text className="text-xl">RDT%</Text>
                        <TextInput
                            className="text-black ml-4 text-2xl px-5 bg-[#e1ebf3] rounded-lg border-[#62a3da] border-2"
                            disabled
                            onChangeText={newText => setText(newText)}
                            value={"30%"}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default RDTTimer