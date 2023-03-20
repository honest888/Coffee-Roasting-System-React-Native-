import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./component/Main";
import RDTTimer from "./component/RDTTimer";
import RoastProfile from "./component/RoastProfile";
import EspressoLog from "./component/EspressoLog";
import EspressoProfile from "./component/EspressoProfile";
import Calculator from "./component/Calculator";
import RoastShow from "./component/RoastShow";
import {
	SafeAreaProvider,
} from 'react-native-safe-area-context';

export default function App() {
	const Stack = createNativeStackNavigator();
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Main" component={Main}></Stack.Screen>
					<Stack.Screen name="RDTTimer" component={RDTTimer}></Stack.Screen>
					<Stack.Screen name="RoastProfile" component={RoastProfile}></Stack.Screen>
					<Stack.Screen name="EspressoLog" component={EspressoLog}></Stack.Screen>
					<Stack.Screen name="EspressoProfile" component={EspressoProfile}></Stack.Screen>
					<Stack.Screen name="Calculator" component={Calculator}></Stack.Screen>
					<Stack.Screen name="RoastShow" component={RoastShow}></Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
