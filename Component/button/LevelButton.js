import { View, StyleSheet, Text, TouchableOpacity, TextInput} from "react-native";
import {useState} from 'react';

export default function LevelButton({text, value, setValue, styleValue}) {
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
    }

    return (
        <View style={[styles.button_select_container, {marginLeft: styleValue}]}>
            <TouchableOpacity 
                style={select === text[0] ? styles.select_button : styles.button}
                onPress={() => {
                    setSelect(text[0]);
                    handleChange(text[0], "TestData", "test_type");
                }}
            >
                <Text style={select === text[0] ? styles.select_button_text : styles.button_text}>{text[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={select === text[1] ? styles.select_button : styles.button}
                onPress={() => {
                    setSelect(text[1]);
                    handleChange(text[1], "TestData", "test_type");
                }}
            >
                <Text style={select === text[1] ? styles.select_button_text : styles.button_text}>{text[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={select === text[2] ? styles.select_button : styles.button}
                onPress={() => {
                    setSelect(text[2]);
                    handleChange(text[2], "TestData", "test_type");
                }}
            >
                <Text style={select === text[2] ? styles.select_button_text : styles.button_text}>{text[2]}</Text>
            </TouchableOpacity>
            {text[3] !== '실습' ? (
                <TouchableOpacity
                    style={select === text[3] ? styles.select_button : styles.button}
                    onPress={() => {
                        setSelect(text[3]);
                        handleChange(text[3], "TestData", "test_type");
                    }}
                >
                    <Text style={select === text[3] ? styles.select_button_text : styles.button_text}>{text[3]}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={select === text[3] ? styles.select_button : styles.button}
                    onPress={() => {
                        setSelect(text[3]);
                        handleChange(text[3], "TestData", "test_type");
                    }}
                >
                    <Text style={select === text[3] ? [styles.select_button_text, {paddingHorizontal: 7}] : [styles.button_text, {paddingHorizontal: 7}]}>{text[3]}</Text>
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
        padding: 12,
        paddingVertical: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    select_button: {
        backgroundColor: '#007AFF',
        marginRight: 10,
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    select_button_text: {
        color: '#FFFFFF',
    },
});