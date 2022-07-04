import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import CustomRatingBar from "../../Component/start_rating/CustomRatingBar";
import { FontAwesome } from '@expo/vector-icons';
import FooterNav from "../../Component/nav/FooterNav";
import Title from "../../Component/Title/Title";

export default function HomeScreen({navigation}) {
    const [search, setSearch] = useState("");
    const [list, setList] = useState();
    
    const lecture_list = require('./Lecture.json').lecture_list;

    const searchLecture = (text) => {
        if (text) {
            lecture_list.filter(element => element.subject_name === text ? setList(element) : null);
            setSearch(text);
        } else {
            setSearch('');
            setList();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Title />
                <View style={styles.search_container}>
                    <View style={styles.search}>
                        <SearchBar
                            round
                            onChangeText={(text) => searchLecture(text)}
                            value={search}
                            onClear={(text) => setSearch('')}
                            placeholder="과목명, 교수님명으로 검색"
                            inputContainerStyle={{backgroundColor: '#DADADA'}}
                            containerStyle={{backgroundColor: '#FFFFFF', borderTopWidth: 0, borderBottomWidth: 0}}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.article}>
                {
                    list !== undefined ? (
                        <View style={styles.lecture_list}>
                            <View style={styles.lecture_review_info}>
                                <Text style={styles.subject_title}>{list.subject_name}</Text>
                                <Text style={styles.profesor_name_title}>{list.profesor_name} 교수</Text>
                                <View>
                                    <View style={styles.lecture_score_container}>
                                        <CustomRatingBar />
                                        <Text style={styles.lecture_score}>4.0/50</Text>
                                    </View>
                                    <Text style={styles.review_writer}>22학년도 수강자</Text>
                                </View>
                                
                                <View style={styles.lecture_review_content}>
                                    <Text>{list.review}</Text>
                                </View>
                            </View>
                            <View style={styles.lecture_review_count}>
                                <View style={styles.lecture_review_count_title}>
                                    <Text>후기 수</Text>
                                </View>
                                <View style={styles.lecture_review_count_display}>
                                    <Text>1</Text>
                                </View>
                            </View>
                            
                        </View> 
                    ) : (
                    <View style={styles.lecture_list_nonContest}>
                        <Text style={styles.lecture_list_nonContest_text}>강의평가한 과목이 없습니다. </Text>
                    </View>
                    )
                }
                
            </View>
            <View style={styles.sub_container}>
                <TouchableOpacity style={{width: 40}} onPress={() => navigation.navigate("WriteReview")}>
                    <View style={styles.wirte_button}>
                        <FontAwesome name="pencil-square-o" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginLeft: 20,
        marginRight: 20,
    }, 

    search_container: {
        flex: 1,
        justifyContent: 'center',   
    },
    search: {
        width: 330,
    },
    
    article: {
        flex: 3,
        marginLeft: 5,
        marginRight: 5,
    },
    lecture_list: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#DBDBDB',
        borderBottomColor: '#DBDBDB',
        flexDirection: 'row',
        flex: 0.28,
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
    review_writer: {
        color:'#B0B0B0',
        fontSize: 10,
        marginTop: 5
    },
    lecture_review_content: {
        marginTop: 10,
    },
    lecture_list_nonContest: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lecture_list_nonContest_text: {
        fontSize: 25,
    }, 
    lecture_review_count_title: {
        backgroundColor: '#F2F2F2',
        width: 60,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    lecture_review_count_display: {
        width: 60,
        height: 26,
        justifyContent: 'center',
        marginLeft: 5
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