import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ListCard from "./ListCard";

const Main = ({ navigation }) => {

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);


	const insets = useSafeAreaInsets();
	const goToRDTTimer = () => {
		navigation.navigate("RDTTimer");
	}
	const goToRoastProfile = () => {
		navigation.navigate("RoastProfile");
	}
	const goToEspressoLog = () => {
		navigation.navigate("EspressoLog");
	}
	const goToEspressoProfile = () => {
		navigation.navigate("EspressoProfile");
	}
	const goToCalculator = () => {
		navigation.navigate("Calculator");
	}

	return (
		<View style={{
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
			paddingLeft: insets.left,
			paddingRight: insets.right,
		}}
			className="flex-1 flex-col"
		>
			<View className="bg-[#205d8f] p-2">
				<Text className="text-center text-4xl font-bold text-slate-50">Coffee Roasting Development Timer</Text>
			</View>
			<View className="flex-auto flex-col bg-blue-400">
				<TouchableOpacity className="basis-1/5"><ListCard text="RDT Timer" onPress={goToRDTTimer}></ListCard></TouchableOpacity>
				<TouchableOpacity className="basis-1/5"><ListCard text="Roast Profiles" onPress={goToRoastProfile} ></ListCard></TouchableOpacity>
				<TouchableOpacity className="basis-1/5"><ListCard text={`Espresso Log\n(Coming Soon)`} onPress={goToEspressoLog}></ListCard></TouchableOpacity>
				<TouchableOpacity className="basis-1/5"><ListCard text={`Espresso Profiles\n(Coming Soon)`} onPress={goToEspressoProfile}></ListCard></TouchableOpacity>
				<TouchableOpacity className="basis-1/5"><ListCard text={`Brew and End Time\nCalculators\n(Coming Soon)`} onPress={goToCalculator} ></ListCard></TouchableOpacity>
			</View>
		</View>
	);
};

export default Main;
