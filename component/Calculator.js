import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import { useState, useLayoutEffect } from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Calculator = ({ navigation }) => {
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
            <View><Text>SS</Text></View>
        </View>
    )
}

export default Calculator