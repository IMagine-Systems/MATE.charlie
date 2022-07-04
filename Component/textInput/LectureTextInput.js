import {StyleSheet, TextInput} from "react-native";
export default function LectureTextInput({text}) {
    return (
        <TextInput
            placeholder={text} 
            style={styles.lecture_professor_input}
        />
    )
}

const styles = StyleSheet.create({
    lecture_professor_input: {
        backgroundColor: '#F2F2F2',
        width: 290,
        height: 25,
        borderRadius: 10
    },
});
