import { View, StyleSheet, Text, TouchableOpacity, TextInput} from "react-native";
import {useState} from 'react';

export default function ReviewButton({text, value, setValue, styleValue}) {
    const [select, setSelect] = useState('');

    const handleChange = (text, eventName, subEventName) => {
        setValue(prev => {
            return {
                ...prev,
                [eventName]: {
                    ...prev[eventName],
                    [subEventName]: text
                }
            }
        })
        console.log(value);
    }

    return (
        <View style={[styles.button_select_container, {marginLeft: styleValue}]}>
            <TouchableOpacity 
                style={select === text[0] ? styles.select_button : styles.button}
                onPress={() => {
                    setSelect(text[0]);
                    handleChange(text[0], "LIDData", "difficulty");
                }}
            >
                <Text style={select === text[0] ? [styles.select_button_text, {paddingHorizontal: 12}] : [styles.button_text, {paddingHorizontal: 12}]}>{text[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={select === text[1] ? styles.select_button : styles.button}
                onPress={() => {
                    setSelect(text[1]);
                    handleChange(text[1], "LIDData", "difficulty");
                }}
            >
                <Text style={select === text[1] ? [styles.select_button_text, {paddingHorizontal: 12}] : [styles.button_text, {paddingHorizontal: 12}]}>{text[1]}</Text>
            </TouchableOpacity>
            {text[2] !== '좋다' ? (
                <TouchableOpacity
                    style={select === text[2] ? styles.select_button : styles.button}
                    onPress={() => {
                        setSelect(text[2]);
                        handleChange(text[2], "LIDData", "difficulty");
                    }}
                >
                    <Text style={select === text[2] ? [styles.select_button_text, {paddingHorizontal: 10}] : [styles.button_text, {paddingHorizontal: 12}]}>{text[2]}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={select === text[2] ? styles.select_button : styles.button}
                    onPress={() => {
                        setSelect(text[2]);
                        handleChange(text[2], "LIDData", "difficulty");
                    }}
                >
                    <Text style={select === text[2] ? [styles.select_button_text, {paddingHorizontal: 17}] : [styles.button_text, {paddingHorizontal: 17}]}>{text[2]}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    button_select_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#F2F2F2',
        marginRight: 10,
        padding: 8,
        borderRadius: 15,
        justifyContent: 'center',
    },
    select_button: {
        backgroundColor: '#007AFF',
        marginRight: 10,
        padding: 8,
        borderRadius: 15,
        justifyContent: 'center',
    },
    select_button_text: {
        color: '#FFFFFF',
    },
});