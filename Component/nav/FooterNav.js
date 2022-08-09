import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function FooterNav() {
    return (
        <View style={styles.footer}>
            <View style={styles.nav}>
                <TouchableOpacity>
                    <MaterialIcons name="rate-review" size={40} color="#A6CFFF" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo name="home" size={40} color="#A6CFFF" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome5 name="clipboard-list" size={40} color="#A6CFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    footer: {
        flex: 0.5,
        borderTopWidth: 2,
        borderTopColor: '#F2F2F2'
    },
});