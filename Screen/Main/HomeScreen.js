import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { auth } from '../../db/DatabaseConfig/firebase';
import { signOut } from 'firebase/auth';

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text>HomeScre</Text>
            <TouchableOpacity
                onPress={() => {
                    signOut(auth);
                    navigation.navigate("LoginScreen");
                }}
                style={{padding: 30, backgroundColor: 'yellow', width: 150}}
            >
                <Text>로그아웃</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});