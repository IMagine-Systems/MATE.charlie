import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { db, auth } from "../../db/DatabaseConfig/firebase";
import { doc, setDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import ReviewTestButton from "../../Component/button/ReviewTestButton";
import CustomRatingBar from "../../Component/start_rating/CustomRatingBar";

export default function ReviewInfo({navigation, route}) {
    const myDoc = doc(db, 'Review', 'ReviewData');
    const [ value, selectValue ] = useState("강의 평가");
    const isFocused = useIsFocused();

    useEffect(() => {
        console.log("review : ", route.params.TestData.subject);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
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
            <View style={styles.article}>
                <ReviewTestButton text={["강의 평가", "시험 후기"]} selectValue={selectValue}/>
                {
                    value === "강의 평가" ? (
                        <View>
                            <View style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}>
                                <Text style={{fontSize: 20, marginRight: 10, marginTop: 10}}>{route.params.TestData.subject}</Text>
                                <Text style={{fontSize: 20, marginTop: 10}}>{route.params.TestData.professor_name} 교수</Text>
                            </View>
                            <View style={{width: "100%", height: 200, borderTopWidth: 0.3, borderBottomWidth: 0.3, marginTop: 15, justifyContent: 'center'}}>
                                <View style={styles.review_writer_studentID}>
                                    <CustomRatingBar data={route.params.LIDData}/>
                                    <Text style={styles.review_writer}>22학년도 수강자</Text>
                                    <View style={styles.declartion_container}>
                                        <TouchableOpacity style={styles.declartion_button}>
                                            <Text>신고</Text>
                                        </TouchableOpacity>
                                    </View>  
                                </View>
                                <View style={{flexDirection: 'row', marginLeft: 30, marginTop: 15, alignItems: 'center'}}>
                                    <Text style={{fontSize: 16, marginRight: 20}}>학점 비율</Text>                            
                                    <View style={{borderRadius: 18, backgroundColor: '#606060', padding: 10, paddingHorizontal: 18}}>
                                        <Text style={{fontSize: 16, color: '#FFFFFF'}}>{route.params.LIDData.difficulty}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', marginLeft: 30, marginTop: 15, alignItems: 'center'}}>
                                    <Text style={{fontSize: 16, marginRight: 20}}>후기</Text>                            
                                    <View>
                                        <Text style={{fontSize: 16}}>{route.params.LIDData.review}</Text>
                                    </View>
                                </View>
                            </View>   
                        </View>
                    ) : (
                        <View>
                            <View style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}>
                                <Text style={{fontSize: 20, marginRight: 10, marginTop: 10}}>{route.params.TestData.subject}</Text>
                                <Text style={{fontSize: 20, marginTop: 10}}>{route.params.TestData.professor_name} 교수</Text>
                            </View>
                            <View style={{width: "100%", height: 200, borderTopWidth: 0.3, borderBottomWidth: 0.3, marginTop: 15, justifyContent: 'center'}}>
                                <View style={styles.review_writer_studentID}>
                                    <Text style={styles.review_writer}>22학년도 수강자</Text>
                                    <View style={styles.declartion_container}>
                                        <TouchableOpacity style={styles.declartion_button}>
                                            <Text>신고</Text>
                                        </TouchableOpacity>
                                    </View>  
                                </View>
                                <View style={{flexDirection: 'row', marginLeft: 30, marginTop: 15, alignItems: 'center'}}>
                                    <Text style={{fontSize: 16, marginRight: 20}}>시험 전략</Text>                            
                                    <Text style={{fontSize: 16}}>{route.params.TestData.test_tip}</Text>                            
                                </View>
                                <View style={{flexDirection: 'row', marginLeft: 30, marginTop: 15, alignItems: 'center'}}>
                                    <Text style={{fontSize: 16, marginRight: 20}}>문제 유형</Text>                            
                                    <View style={{borderRadius: 18, backgroundColor: '#606060', padding: 10, paddingHorizontal: 18}}>
                                        <Text style={{fontSize: 16, color: '#FFFFFF'}}>{route.params.TestData.test_type}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', marginLeft: 30, marginTop: 15, alignItems: 'center'}}>
                                    <Text style={{fontSize: 16, marginRight: 20}}>문제 예시</Text>                            
                                    <Text style={{fontSize: 16}}>{route.params.TestData.test_ex}</Text>
                                </View>
                            </View>   
                        </View>
                    )
                }
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
        flex: 0.325,
        marginLeft: 20,
        marginRight: 20,
    }, 
    title_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
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
    search_container: {
        flex: 0.3 ,
        justifyContent: 'center',   
        alignItems: 'center',
    },
    search: {
        width: 330,
    },
    
    article: {
        flex: 3,
        marginLeft: 5,
        marginRight: 5,
    },
    review: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#DBDBDB',
        borderBottomColor: '#DBDBDB',
    },
    lecture_list: {
        flexDirection: 'row',
    },
    lecture_review_info: {
        flex: 1,
        paddingLeft: 30,
        paddingTop: 10,
    },
    lecture_review_count: {
        flex: 0.4,
        paddingTop: 10,
        flexDirection: 'row',
    },
    subject_title: {
        fontSize: 20
    },
    profesor_name_title: {
        fontSize: 15,
    },
    lecture_score: {
        marginTop: 5,
        marginLeft: 10,
    },
    lecture_score_container: {
        flexDirection: 'row'
    },
    review_writer_studentID: {
        flexDirection: 'row',
        marginLeft: 30,
        alignItems: 'flex-end',
    },
    review_writer: {
        color:'#B0B0B0',
        fontSize: 10,
    },
    lecture_score_range: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center'
    },
    lecture_score_range_background: {
        backgroundColor: '#606060',
        padding: 10,
        borderRadius: 12,
        marginLeft: 15,
    },
    lecture_review_content: {
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    lecture_list_nonContest: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lecture_list_nonContest_text: {
        fontSize: 25,
    },
    declartion_container: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 130
    },
    declartion_button: {
        backgroundColor: '#F2F2F2',
        width: 60,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 10,
    },
    sub_container: {
        flex: 0.7,
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    wirte_button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A6CFFF',
        width: 49,
        height: 48,
        borderRadius: 25,
    },
    
});