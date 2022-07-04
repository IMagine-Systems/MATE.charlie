import { View, StyleSheet, Text, TouchableOpacity, TextInput} from "react-native";
import ReviewButton from "../../Component/button/ReviewButton";
import ReviewTestButton from "../../Component/button/ReviewTestButton";
import SelectRating from "../../Component/start_rating/SelectRating";
import LectureTextInput from "../../Component/textInput/LectureTextInput";
import ReviewTextInput from "../../Component/textInput/ReviewTextInput";
import Title from "../../Component/Title/Title";
import { Ionicons } from '@expo/vector-icons';
import {useState} from 'react';

export default function LectureReview() {
    const [selectValue, setSelectValue] = useState('강의평가');
    return (
        <View>
            <View style={styles.lecture_select_container}>
                <ReviewTestButton text={['강의평가', '중간고사', '기말고사']} selectValue={setSelectValue}/>
                <View style={styles.lecture_input_container}>
                    <View style={styles.input_sub}>
                        <Text style={styles.input_text}>강의</Text>
                        <LectureTextInput text={'강의명을 정확하게 적어주세요.'}/>
                    </View>
                    <View style={styles.input_sub}>
                        <Text style={styles.input_text}>교수</Text>
                        <LectureTextInput text={'교수님 성함을 정확하게 적어주세요.'}/>
                    </View>
                </View>
            </View>
            <View style={styles.lecture_write_review_container}>
                <SelectRating />
                <View style={styles.input_sub}>
                    <Text style={styles.input_text}>과제</Text>
                    <ReviewButton text={['많다', '평범', '적다']} styleValue={25} />
                </View>
                <View style={styles.input_sub}>
                    <Text style={styles.input_text}>학점 비율</Text>
                    <ReviewButton text={['엄격', '평범', '굿']} styleValue={0} />
                </View>
                <View style={styles.input_sub}>
                    <Text style={styles.input_text}>후기</Text>
                    <ReviewTextInput text={"교수님 성함을 정확하게 적어주세요."} />
                </View>
                <View style={[styles.input_sub, {justifyContent: 'flex-end', marginRight: 35}]}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={[styles.button_text, {paddingHorizontal: 5}]}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    lecture_select_container: {
        flex: 0.25,
        borderBottomColor: '#DBDBDB',
        borderBottomWidth: 1,
    },
    button: {
        backgroundColor: '#F2F2F2',
        marginRight: 10,
        padding: 8,
        borderRadius: 15,
        justifyContent: 'center',
    },
});