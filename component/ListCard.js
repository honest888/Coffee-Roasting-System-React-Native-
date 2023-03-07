import { View, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';


const ListCard = ({ text, onPress }) => {
    return (
        <LinearGradient
            colors={['rgb(80, 138, 191)', 'rgb(78, 136, 189)', 'rgb(35, 95, 145)']}
            className="h-full"
        >
            <TouchableOpacity className="flex items-center justify-center h-full" onPress={onPress} >
                <Text className="text-center text-2xl text-slate-50 font-bold text-wrap">{text}</Text>
            </TouchableOpacity>
        </LinearGradient >
    )
}

export default ListCard