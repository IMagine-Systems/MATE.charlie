import {StyleSheet, TextInput} from "react-native";
import { useState, useEffect } from "react/cjs/react.development";

export default function ReviewTextInput({text, value, setValue, input, data}) {
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
    }

    useEffect(() => {
        if (texts !== "") {
            handleChange(texts, data, input);
        }
    }, []);


    return (
        <TextInput
            placeholder={text}
            style={styles.review_input}
            value={texts}
            onChangeText={(review) => handleChange(review, data, input)}
            multiline={true}
            maxLength={250}
        />
    )
}

const styles = StyleSheet.create({
    review_input: {
        backgroundColor: '#F2F2F2',
        width: 290,
        height: 140,
        borderRadius: 10,
        paddingLeft: 15,
    },
});
