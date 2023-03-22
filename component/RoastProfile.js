import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useState, useLayoutEffect, useEffect } from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { database } from "./Database";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoastProfile = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedDataID, setSelectedDataID] = useState(0);
    const [editData, setEditData] = useState({});
    const changeEditData = (name, value) => {
        setEditData({ ...editData, [name]: value });
    }

    useEffect(() => {
        database.getRoastProfiles(setDataFromDB);
    }, []);

    const setDataFromDB = (data) => {
        // console.log(data);
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

    const [modalVisible, setModalVisible] = useState(false);

    const editModalShow = (index) => {
        setSelectedIndex(index);
        setSelectedDataID(data[index].id);
        setEditData(data[index]);
        setModalVisible(true);
    }

    const saveEditData = () => {
        let temp = [...data];
        temp[selectedIndex] = editData;
        setData(temp);
        database.updateRoastProfile(selectedDataID, editData);
        setModalVisible(false);
    }

    const deleteData = (index) => {
        database.deleteRoastProfile(data[index].id);
        let temp = [...data];
        temp.splice(index, 1);
        setData(temp);
    }

    return (
        <View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? 'padding' : "height"}>
                    <View className="bg-black/40 h-full">
                        <View className="m-5 p-6 flex-1 bg-white">
                            <Text className="text-center italic text-2xl mt-6">Edit Roast Profile</Text>
                            <View className="flex-1 mt-8 justify-between">
                                <ScrollView>
                                    <View className="flex-1 justify-between">
                                        <TextInput
                                            className="text-xl border-b focus:border-b-2"
                                            multiline
                                            placeholder='Name'
                                            onChangeText={newText => changeEditData("name", newText)}
                                            value={editData.name}
                                        />
                                        <TextInput
                                            className="text-xl border-b focus:border-b-2 mt-7"
                                            multiline
                                            placeholder='Temperature'
                                            onChangeText={newText => changeEditData("temperature", newText)}
                                            value={editData.temperature}
                                        />
                                        <TextInput
                                            className="text-xl border-b focus:border-b-2 mt-7"
                                            multiline
                                            placeholder='Yellow Phase'
                                            onChangeText={newText => changeEditData("yellowPhase", newText)}
                                            value={editData.yellowPhase}
                                        />
                                        <TextInput
                                            className="text-xl border-b focus:border-b-2 mt-7"
                                            multiline
                                            placeholder='Maillard Phase'
                                            onChangeText={newText => changeEditData("maillardPhase", newText)}
                                            value={editData.maillardPhase}
                                        />
                                        <TextInput
                                            className="text-xl border-b focus:border-b-2 mt-7"
                                            multiline
                                            placeholder='First Crack'
                                            onChangeText={newText => changeEditData("firstCrack", newText)}
                                            value={editData.firstCrack}
                                        />
                                        <TextInput
                                            className="text-xl border-b focus:border-b-2 mt-7"
                                            multiline
                                            placeholder='End Time'
                                            onChangeText={newText => changeEditData("endTime", newText)}
                                            value={editData.endTime}
                                        />
                                        <TextInput
                                            className="text-xl border-b focus:border-b-2 mt-7"
                                            multiline
                                            placeholder='Green Weight'
                                            onChangeText={newText => changeEditData("greenWeight", newText)}
                                            value={editData.greenWeight}
                                        />
                                        <TextInput
                                            className="text-xl border-b focus:border-b-2 mt-7"
                                            multiline
                                            placeholder='End Weight'
                                            onChangeText={newText => changeEditData("endWeight", newText)}
                                            value={editData.endWeight}
                                        />
                                        <TextInput
                                            className="text-xl border-b focus:border-b-2 mt-7"
                                            multiline
                                            placeholder='Weight Loss'
                                            onChangeText={newText => changeEditData("weightLoss", newText)}
                                            value={editData.weightLoss}
                                        />
                                    </View>
                                </ScrollView>
                                <TouchableOpacity className="bg-[#4e94cf] rounded-sm p-3 mt-2"
                                    onPress={saveEditData}>
                                    <Text className="text-center font-extrabold text-2xl text-slate-50 ">SAVE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
            <View className="p-4">
                {data.map((item, index) => {
                    return (
                        <TouchableOpacity className="mt-3 p-4 bg-white w-full flex flex-row items-center" key={index} onPress={() => { goToRoastShowPage(index) }}>
                            <View className="flex-auto">
                                <Text className="font-bold text-lg">Name:{item.name}</Text>
                                <Text>{item.createdDate}</Text>
                            </View>
                            <TouchableOpacity className="mr-5" onPress={() => { editModalShow(index) }}>
                                <SimpleLineIcons name="pencil" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                deleteData(index);
                            }}>
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