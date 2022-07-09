import { View, StyleSheet, Text, TouchableOpacity, TextInput, SafeAreaView} from "react-native";
import ReviewButton from "../../Component/button/ReviewButton";
import ReviewTestButton from "../../Component/button/ReviewTestButton";
import SelectRating from "../../Component/start_rating/SelectRating";
import LectureTextInput from "../../Component/textInput/LectureTextInput";
import ReviewTextInput from "../../Component/textInput/ReviewTextInput";
import { Ionicons } from '@expo/vector-icons';
import {useState, useEffect} from 'react';
import LevelButton from "../../Component/button/LevelButton";
import { db } from "../../db/DatabaseConfig/firebase";
import { doc, setDoc, arrayUnion, getDoc } from 'firebase/firestore';

export default function WriteReview({navigation}) {
    const [selectValue, setSelectValue] = useState('강의후기');
    
    const [value, setValue] = useState({
        UID : 0,
        LIDData: {
            subject: "",
            professor_name: "",
            code: 1000,
            day: "",
            score: 3.0,
            difficulty: "",
            review: "",
        },
        TestData: {
            subject: "",
            professor_name: "",
            code: 1000,
            day: "",
            testReview: [],
        },

    });
    
    useEffect(() => {
        setDate();
    }, []);

    useEffect(() => {
    }, [selectValue]);


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

    const setDate = () => {
        let today = new Date();  
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();

        let day = year + '/' + month + '/' + date;
        console.log(day);
        handleChange(day, "LIDData", "day");
    }

    const reviewUpdate = () => {
        const myDoc = doc(db, 'Review', 'ReviewData');
        setDate();
        setDoc(myDoc, {"ReviewData": arrayUnion(value)}, {merge: true})
        .then(() => alert("후기 등록 완료"))
        .catch((error) => alert(error.message));
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
                    <View style={styles.profile}>
                       <TouchableOpacity
                            onPress={() => navigation.navigate("Profile")}
                        >
                            <Ionicons name="person-circle" size={38} color="#A6CFFF" />
                        </TouchableOpacity>
                     </View>
                </View>
            </View>

            <View style={styles.article}>
                <View style={styles.lecture_select_container}>
                    <ReviewTestButton text={['강의후기', '시험후기']} selectValue={setSelectValue}/>
                    <View style={styles.lecture_input_container}>
                        <View style={styles.input_sub}>
                            <Text style={styles.input_text}>강의</Text>
                            <LectureTextInput
                                text='강의명을 정확하게 적어주세요.' 
                                value={value}
                                setValue={setValue}
                                input={"subject"}
                                data={"LIDData"}
                            />
                        </View>
                        <View style={styles.input_sub}>
                            <Text style={styles.input_text}>교수</Text>
                            <LectureTextInput
                                text='교수님 성함을 정확하게 적어주세요.' 
                                value={value}
                                setValue={setValue}
                                input={"professor_name"}
                                data={"LIDData"}
                            />                         
                        </View>
                    </View>
                </View>
                {selectValue === '강의후기' ? (
                    <View style={styles.lecture_write_review_container}>
                        <SelectRating value={value} setValue={setValue} />                        
                        <View style={styles.input_sub}>
                            <Text style={styles.input_text}>학점 비율</Text>
                            <ReviewButton text={['힘들다', '적당하다', '좋다']} value={value} setValue={setValue} styleValue={0}/>
                        </View>
                        <View style={styles.input_sub}>
                            <Text style={styles.input_text}>후기</Text>
                            <ReviewTextInput text={"강의에 관해 자세히 적어주세요. ex)강의 스타일/교수님 성향/과제 내용 등"} value={value} setValue={setValue} input={"review"} data={"LIDData"}/>
                        </View>
                        <View style={[styles.input_sub, {justifyContent: 'flex-end', marginRight: 35}]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => reviewUpdate()}
                            >
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
                                <Text style={styles.input_text}>문제유형</Text>
                                <LevelButton text={['객관식', '주관식', '서술형', '실습']} styleValue={0}/>
                            </View>
                            <View style={styles.input_sub}>
                                <Text style={styles.input_text}>문제 예시</Text>
                                <ReviewTextInput text={'문제 예시를 정확하게 적어주세요.'} value={value} setValue={setValue} />
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
    profile: {
        flex: 1,
        alignItems: 'flex-end'
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
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 8,
        justifyContent: 'center',
    },
    button_text: {
        fontSize: 18,
    },
    level_button: {
        padding: 10,
        marginRight: 10,
        borderRadius: 15,
        backgroundColor: '#F2F2F2'
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
