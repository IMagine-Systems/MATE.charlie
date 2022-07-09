import { View, StyleSheet, Text, TouchableOpacity, TextInput} from "react-native";
import {useState} from 'react';

export default function ReviewTestButton({text, selectValue}) {
    const [select, setSelect] = useState('강의후기');
    const selectButtonValue = (select) => {
        selectValue(select);
    }
    return (
        <View style={styles.review_select_container}>
            <TouchableOpacity 
                style={select === text[0] ? styles.select_button : styles.button}
                onPress={() => {
                    setSelect(text[0])
                    selectButtonValue(text[0]);
                }}
            >
                <Text style={select === text[0] ? styles.select_button_text : styles.button_text}>{text[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={select === text[1] ? styles.select_button : styles.button}
                onPress={() => {
                    setSelect(text[1]);
                    selectButtonValue(text[1]);
                }}
            >
                <Text style={select === text[1] ? styles.select_button_text : styles.button_text}>{text[1]}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    review_select_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#F2F2F2',
        marginRight: 10,
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    select_button: {
        backgroundColor: '#606060',
        marginRight: 10,
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    button_text: {
        fontSize: 18,
    },
    select_button_text: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});