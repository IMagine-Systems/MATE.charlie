import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Title({navigation}) {
    return (
        <View style={styles.title_container}>
            <View style={styles.title_logo}>
                <TouchableOpacity>
                    <Text style={styles.title}>MATE</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profile}>
                <TouchableOpacity>
                    <Ionicons name="person-circle" size={38} color="#A6CFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title_container: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title_logo: {
    },
    title: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 35,
    },
    profile: {
        flex: 1,
        alignItems: 'flex-end'
    }
});