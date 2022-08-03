import {StyleSheet, TextInput} from "react-native";

export default function ReviewTextInput({text, value, setValue, input, data}) {
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
        <TextInput
            placeholder={text}
            style={styles.review_input}
            onChangeText={(review) => handleChange(review, data, input)}
            multiline={true}
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
