import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView} from "react-native";
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomRatingBar from "../../Component/start_rating/CustomRatingBar";

export default function LectureReview({navigation}) {
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
                        <TouchableOpacity>
                            <Ionicons name="person-circle" size={38} color="#A6CFFF" />
                        </TouchableOpacity>
                     </View>
                </View>
                <View style={styles.lecture_professor_text}>
                    <Text style={{fontSize: 20}}>과목명 OOO 교수</Text>
                </View>
            </View>
            <View style={styles.article}>
                <View style={styles.review_count_container}>
                    <Text style={styles.review_count_text}>강의평가  1</Text>
                    <Text style={styles.review_count_text}>중간고사  1</Text>
                    <Text style={styles.review_count_text}>기말고사  0</Text>
                </View>
                <View style={styles.review_content_container}>
                    <View style={styles.review_content_score}>
                        <CustomRatingBar />
                        <Text style={{fontSize: 18, marginLeft: 5}}>4.0/5.0</Text>
                    </View>
                    <View style={styles.review_content}>
                        <View style={styles.review_content_text}>
                            <Text style={styles.review_text}>과제</Text>
                            <Text style={styles.review_text}>2번 있음</Text>
                        </View>
                        <View style={styles.review_content_text}>
                            <Text style={styles.review_text}>출결</Text>
                            <Text style={styles.review_text}>매 수업 직접 호명</Text>
                        </View>
                        <View style={styles.review_content_text}>
                            <Text style={styles.review_text}>학점</Text>
                            <Text style={styles.review_text}>평균</Text>
                        </View>
                        <View style={styles.review_content_text}>
                            <Text style={{fontSize: 18, marginTop: 10, marginLeft: 12, marginRight: 12}}>시험 횟 수</Text>
                            <Text style={{marginTop:10, fontSize: 18}}>2회</Text>
                        </View>
                        <View style={styles.review_content_text}>
                            <Text style={{fontSize: 18, marginTop: 10, marginLeft: 12, marginRight: 32}}>조 모임</Text>
                            <Text style={{marginTop:10, fontSize: 18}}>2회</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.user_write_review_container}>
                    <View style={styles.review_content_score}>
                        <CustomRatingBar />
                        <View style={styles.user_studentId_text_container}>
                            <Text style={styles.user_studentId_text}>22학년도 수강자</Text>
                        </View>
                        <View style={styles.recommend_declation_container}>
                            <TouchableOpacity style={styles.recommend_declation_button}>
                                <Text>추천</Text>
                            </TouchableOpacity>
                            <Text style={{marginHorizontal: 10}}>2</Text>
                            <TouchableOpacity style={[styles.recommend_declation_button, {marginRight: 5}]}>
                                <Text>신고</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Text style={{fontSize: 18, marginLeft: 12}}>후기</Text>
                            <Text style={{fontSize: 18, marginLeft: 60}}>PPT 기준으로 수업을 많이 하십니다.</Text>
                        </View>
                    </View>
                </View>
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
        flex: 0.21,
        backgroundColor: '#FFFFFF',
        marginLeft: 20,
        marginRight: 20,
    },
    title_container: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
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
    lecture_professor_text: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    article: {
        flex: 1,
    },
    review_count_container: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    review_count_text: {
        fontSize: 20,
    },
    review_content_container: {
        marginHorizontal: 7,
        flex: 0.35,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 18,
        borderColor: '#DBDBDB',
    },
    review_content_score: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12
    },
    review_content_text: {
        flexDirection: 'row'
    },
    review_text: {
        marginLeft: 12,
        marginRight: 40,
        marginTop: 10,
        fontSize: 18,
    },
    user_write_review_container: {
        marginHorizontal: 7,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#DBDBDB',
    },
    user_studentId_text_container: {
        justifyContent: 'flex-end',
        height: 35
    },
    user_studentId_text: {
        fontSize: 10,
        marginLeft: 5,
        color: '#B0B0B0'
    },
    recommend_declation_container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    recommend_declation_button: {
        backgroundColor: '#F2F2F2',
        padding: 10,
        borderRadius: 13
    }
});