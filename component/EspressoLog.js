import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useState, useLayoutEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EspressoLog = ({ navigation }) => {

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
            <Text>EspressorLog</Text>
        </View>
    )
}

export default EspressoLog