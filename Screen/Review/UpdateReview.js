import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Ionicons } from '@expo/vector-icons';
import {useState, useEffect} from 'react';
import ReviewButton from "../../Component/button/ReviewButton";
import SelectRating from "../../Component/start_rating/SelectRating";
import LectureTextInput from "../../Component/textInput/LectureTextInput";
import ReviewTextInput from "../../Component/textInput/ReviewTextInput";
import LevelButton from "../../Component/button/LevelButton";
import { db, auth } from "../../db/DatabaseConfig/firebase";
import { doc, setDoc, arrayUnion, getDoc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function UpdateReview({navigation, route}) {

    //const [ myEmail, setMyEmail ] = useState("");
    const [ myUid, setMyUid ] = useState("");

    const [value, setValue] = useState({
        UID : 0,
        LIDData: {
            subject: "",
            professor_name: "",
            code: 0,
            day: "",
            score: 0,
            difficulty: "",
            review: "",
            reviewCount: 0,
        },
        TestData: {
            subject: "",
            professor_name: "",
            code: 0,
            test_tip: "",
            test_type: "",
            test_ex: "",
            day: "",
        },
    });
    
    useEffect(() => {
        setDate();
        getUid();
    }, []);


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

    const handleChangeUid = (text, eventName) => {
        setValue(prev => {

            return {
                ...prev,
                [eventName]: text,
            }
        })
    } 

    const getUid = async () => {
        const myDoc = doc(db, "User", "UserInfo");
        let uid;
        let myEmail;
        onAuthStateChanged(auth, (user) => {
            myEmail = user.email; 
        });
        
        await getDoc(myDoc)
        .then((snapshot) => {
            if (snapshot.exists) {
                snapshot.data().UserInfo.map((userDatas) => {
                    if (userDatas.email === myEmail) {
                        uid = userDatas.UID;
                        setMyUid(userDatas.UID);
                        handleChangeUid(uid, "UID");
                    }
                });
            } else {
                console.log("No Document!");
            }
        })
        .catch((error) => console.log(error.message));
    }

    const setDate = () => {
        let today = new Date();  
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();

        let day = year + '/' + month + '/' + date;
        handleChange(day, "LIDData", "day");
        handleChange(day, "TestData", "day");
    }

    const reviewUpdate = async () => {
        const myDoc = doc(db, 'Review', 'ReviewData');
        await getUid();
        setDate();
        if (
            value.LIDData.difficulty !== "" && value.LIDData.subject !== "" && value.LIDData.professor_name !== "" && value.LIDData.score !== 0 &&  value.LIDData.review !== "" &&
            value.TestData.test_type !== "" && value.TestData.subject !== "" && value.TestData.professor_name !== "" && value.TestData.test_tip !== "" && value.TestData.test_ex !== "") {
            //handleChange(route.params.LIDData.reviewCount, "LIDData", "reviewCount");
            value.LIDData.reviewCount = route.params.LIDData.reviewCount;
            
            console.log(value.LIDData.reviewCount);
            await updateDoc(myDoc, {"ReviewData": arrayRemove(route.params)}, {merge: true})
            await updateDoc(myDoc, {"ReviewData": arrayUnion(value)}, {merge: true})
            .then(() => {   
                alert("수정 완료");
                navigation.navigate("HomeScreen");
            })
            .catch((error) => alert(error.message));
        } else {
            console.log(value);
            alert("리뷰 작성 안한 항목이 있습니다.");
        }
    }

    console.log("WriteReview Update : ", route.params.LIDData);
  return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
                            onPress={() => navigation.navigate("ProfileScreen")}
                        >
                            <Ionicons name="person-circle" size={38} color="#A6CFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ProgressSteps
                activeStepIconBorderColor="#007AFF"
                progressBarColor="#007AFF"
                completedProgressBarColor="#007AFF"
                activeStepIconColor="#007AFF"
                completedStepIconColor="#007AFF"
                activeStepNumColor="#FFFFFF"
                activeLabelColor="#007AFF"
                
            >
                <ProgressStep label="강의후기">
                    <View style={styles.article}>
                        <View style={styles.lecture_select_container}>
                            <View style={styles.lecture_input_container}>
                                <View style={styles.input_sub}>
                                    <Text style={styles.input_text}>강의</Text>
                                    <LectureTextInput
                                        text='강의명을 정확하게 적어주세요.' 
                                        value={route.params.LIDData.subject}
                                        setValue={setValue}
                                        input={"subject"}
                                        data={"LIDData"}
                                    />
                                </View>
                                <View style={styles.input_sub}>
                                    <Text style={styles.input_text}>교수</Text>
                                    <LectureTextInput
                                        text='교수님 성함을 정확하게 적어주세요.' 
                                        value={route.params.LIDData.professor_name}
                                        setValue={setValue}
                                        input={"professor_name"}
                                        data={"LIDData"}
                                    />                         
                                </View>
                            </View>
                            <View style={styles.lecture_write_review_container}>
                                <View style={styles.input_sub}>
                                    <Text style={styles.input_text}>평점</Text>
                                    <SelectRating value={route.params.LIDData.score} setValue={setValue} />                        
                                </View>
                                <View style={styles.input_sub}>
                                    <Text style={styles.input_text}>성적</Text>
                                    <ReviewButton text={['힘들다', '적당하다', '좋다']} value={route.params.LIDData.difficulty} setValue={setValue} styleValue={0}/>
                                </View>
                                <View style={styles.input_sub}>
                                    <Text style={styles.input_text}>후기</Text>
                                    <ReviewTextInput text={"강의에 관해 자세히 적어주세요. ex)강의 스타일/교수님 성향/과제 내용 등 최대 250자 작성 가능"} value={route.params.LIDData.review} setValue={setValue} input={"review"} data={"LIDData"}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </ProgressStep>
                <ProgressStep 
                    label="시험후기"
                    onSubmit={reviewUpdate}
                    finishBtnText="완료"
                    previousBtnText="이전"
                >
                    <View style={styles.lecture_write_review_container}>
                        <View style={styles.lecture_input_container}>
                            <View style={styles.input_sub}>
                                <Text style={styles.input_text}>시험 전략</Text>
                                <ReviewTextInput text={'시험전략을 적어주세요. 최대 250자 작성 가능'}  value={route.params.TestData.test_tip} setValue={setValue} input={"test_tip"} data={"TestData"}/>
                            </View>
                            <View style={styles.input_sub}>
                                <Text style={styles.input_text}>문제유형</Text>
                                <LevelButton text={['객관식', '주관식', '서술형', '실습']} styleValue={0} value={route.params.TestData.test_type} setValue={setValue} input={"test_type"} data={"TestData"} />
                            </View>
                            <View style={styles.input_sub}>
                                <Text style={styles.input_text}>문제 예시</Text>
                                <ReviewTextInput text={'문제 예시를 정확하게 적어주세요. 최대 250작성 가능'} value={route.params.TestData.test_ex} setValue={setValue} input={"test_ex"} data={"TestData"} />
                            </View>
                        </View>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        flex: 0.15,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
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