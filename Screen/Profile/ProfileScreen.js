import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Alert} from "react-native";
import ReviewButton from "../../Component/button/ReviewButton";
import ReviewTestButton from "../../Component/button/ReviewTestButton";
import SelectRating from "../../Component/start_rating/SelectRating";
import LectureTextInput from "../../Component/textInput/LectureTextInput";
import ReviewTextInput from "../../Component/textInput/ReviewTextInput";
import { auth } from "../../db/DatabaseConfig/firebase";
import { signOut } from "firebase/auth";
import { MaterialIcons } from '@expo/vector-icons';
import {useState, useEffect} from 'react';


export default function ProfileScreen({navigation}) {
    const [selectValue, setSelectValue] = useState('강의평가');

    useEffect(() => {
    }, [selectValue])

    const logOut = () => {
        Alert.alert(
            "로그아웃 하실건가요?",
            "",
            [
              {
                text: "아니요",
                style: "cancel"
              },
              { text: "예", onPress: () => signOut(auth) }
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.title_container}>
                    <View style={styles.title_logo}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("HomeScreen")}
                        >
                            <Text style={styles.title}>MATE</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.logOut} onPress={() => logOut()}>
                        <MaterialIcons name="logout" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.article}>
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
                {selectValue === '강의평가' ? (
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
                ) : (
                    <View style={styles.lecture_write_review_container}>
                        <View style={styles.lecture_input_container}>
                            <View style={styles.input_sub}>
                                <Text style={styles.input_text}>시험 전략</Text>
                                <ReviewTextInput text={'시험전략을 적어주세요.'}/>
                            </View>
                            <View style={styles.input_sub}>
                                <Text style={styles.input_text}>문제 유형</Text>
                                <ReviewTextInput text={'문제 유형을 정확하게 적어주세요.'}/>
                            </View>
                            <View style={styles.input_sub}>
                                <Text style={styles.input_text}>문제 예시</Text>
                                <ReviewTextInput text={'문제 예시를 정확하게 적어주세요.'}/>
                            </View>
                            <View style={[styles.input_sub, {justifyContent: 'flex-end', marginRight: 35}]}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={[styles.button_text, {paddingHorizontal: 5}]}>확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        flex: 0.32,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center'
    },
    title_container: {
        flex: 0.5,
        flexDirection: 'row',
    },
    title_logo: {
    },
    title: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 35,
    },
    logOut: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    article: {
        flex: 3,
        marginLeft: 5,
        marginRight: 5,
    },
    lecture_select_container: {
        flex: 0.33,
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
    button_text: {
        fontSize: 18,
    },
    input_sub: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 15,
        alignItems: 'center',
    },
    input_text: {
        marginHorizontal: 10,
        fontSize: 13,
        color: '#5B5656'
    },
    lecture_write_review_container: {
        flex: 1,
    }
});
