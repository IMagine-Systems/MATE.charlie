import {StyleSheet, TextInput} from "react-native";
import { useState, useEffect } from "react/cjs/react.development";
export default function LectureTextInput({text, value, setValue, input, data}) {
    const [texts, setTexts] = useState(value??"");

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
        setTexts(text);
        //console.log(value);
    }

    useEffect(() => {
        if (texts !== "") {
            handleChange(texts, data, input);
            handleChange(texts, "TestData", input);
        }
    }, []);

    
    return (
        <TextInput
            placeholder={text} 
            style={styles.lecture_professor_input}
            value={texts}
            onChangeText={(text) => {
                handleChange(text, data, input);
                handleChange(text, "TestData", input);
            }}
            maxLength={250}
        />
    )
}

const styles = StyleSheet.create({
    lecture_professor_input: {
        backgroundColor: '#F2F2F2',
        width: 290,
        height: 25,
        borderRadius: 10,
        paddingLeft: 15,
    },
});
