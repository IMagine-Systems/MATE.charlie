import { View, Text, StyleSheet } from "react-native";

export default function Title() {
    return (
        <View style={styles.title_container}>
            <Text style={styles.title}>MATE</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title_container: {
        flex: 1.5,
        justifyContent: 'center',
    },
    title: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 35,
    },
});