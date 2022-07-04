import {StyleSheet, TextInput} from "react-native";

export default function ReviewTextInput({text}) {
    return (
        <TextInput
            placeholder={text}
            style={styles.review_input}
        />
    )
}

const styles = StyleSheet.create({
    review_input: {
        backgroundColor: '#F2F2F2',
        width: 290,
        height: 100,
        borderRadius: 10,
    },
});
