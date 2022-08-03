import { View, StyleSheet, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import { useEffect, useState, useRef } from 'react';
import { SearchBar } from 'react-native-elements';
import CustomRatingBar from "../../Component/start_rating/CustomRatingBar";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { db, auth } from "../../db/DatabaseConfig/firebase";
import { doc, setDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';

export default function HomeScreen({navigation}) {
    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);
    const [reviewCount, setReviewCount] = useState(0);
    const [reviewDatas, setReviewDatas] = useState([]);
    const [ myUid, setMyUid ] = useState("");
    
    const RUid = useRef(0); // RUID -> 신고한 uid.
    
    let declation_review = {
        FalseReport : {
            UID: 0,
            RUID: 0,
            LIDData: {
              
            },
            TestData: {
                
            },
        },
        Slang: {
            UID: 0,
            RUID: 0,
            LIDData: {
                
            },
            TestData: {
                
            },
        },
        Disrespect: {
            UID: 0,
            RUID: 0,
            LIDData: {
            },
            TestData: {
            },
        },
    };

    const [value, setValue] = useState({
        FalseReport : {
            UID: 0,
            RUID: 0,
            LIDData: {
              
            },
            TestData: {
                
            },
        },
        Slang: {
            UID: 0,
            RUID: 0,
            LIDData: {
                
            },
            TestData: {
                
            },
        },
        Disrespect: {
            UID: 0,
            RUID: 0,
            LIDData: {
            },
            TestData: {
            },
        },
    });
    const KEY_FALSEREPORT = "허위 작성";
    const KEY_DISRESPECT = "성의 없음";
    const KEY_SLANG = "비속어";

    const myDocUser = doc(db, "User", "UserInfo");
    const myDoc = doc(db, 'Review', 'ReviewData');
    const myDocDeclation = doc(db, "Declaration", "DeclarationInfo");

    const isFocused = useIsFocused();

    useEffect(() => {
        getUid();
        getReviewData();
    }, []);

    useEffect(() => {
        getUid();
        getReviewData();
    }, [isFocused]);

    const lecture_list = require('./Lecture.json').lecture_list;

    const getUid = () => {
        let uid;
        let myEmail;
        onAuthStateChanged(auth, (user) => {
            myEmail = user.email; 
        });
        
        getDoc(myDocUser)
        .then((snapshot) => {
            if (snapshot.exists) {
                snapshot.data().UserInfo.map((userDatas) => {
                    if (userDatas.email === myEmail) {
                        // uid = userDatas.UID;
                        // setMyUid(userDatas.UID);
                        RUid.current = userDatas.UID;
                        console.log("current uid : ", RUid.current);
                    }
                });
            } else {
                console.log("No Document!");
            }
        })
        .catch((error) => console.log(error.message));
    }


    const handleChange = (text, eventName, subEventName) => {
        
        // setValue(prev => (
        //     {
        //         ...prev,
        //         [eventName]: {
        //             ...prev[eventName],
        //             [subEventName]: text
        //         }
        //     }
        // ))

        declation_review[eventName][subEventName] = text;
        //console.log("ref Review : ", refReview);

        // refReview.current = { 
        //     [eventName]: {
        //         [subEventName]: text
        //     },
        // }
        //console.log("refReview : ", refReview.current);
        //console.log("declation_review: ", declation_review);
    }

    const searchLecture = (text) => {
        if (text) {
            lecture_list.filter(element => element.subject_name === text ? setList(current => [...current, element]) : null);
            setSearch(text);
        } else {
            setSearch('');
            setList([]);
        }
    }

    const getReviewData = () => {
        getDoc(myDoc)
        .then((snapshot) => {
            if (snapshot.exists) {
                setReviewCount(snapshot.data().ReviewData.length);
                setReviewDatas(snapshot.data().ReviewData.reverse());
            } else {
                console.log("No Document!");
            }
        })
        .catch((error) => console.log(error.message));
    }
    
    const showCurrentReview = () => {
        if (reviewCount === 0) {
            return (
                <View style={styles.lecture_list_nonContest}>
                    <Text style={styles.lecture_list_nonContest_text}>강의평가한 과목이 없습니다.</Text>
                </View>
            );
        } else {
            return (
                reviewDatas.slice(0, 3).map((reviewData) => (
                    <View style={{flex:0.5, justifyContent: 'center', backgroundColor: 'ye'}}>
                        <TouchableOpacity 
                            style={styles.review}
                            onPress={() => navigation.navigate("ReviewInfo", reviewData)}
                        >
                            <View style={styles.lecture_list}>
                                <View style={styles.lecture_review_info}>
                                    
                                    <View style={{marginBottom: 5}}>
                                        <Text style={{fontSize: 22, marginBottom: 8}}>{reviewData.TestData.subject}</Text>
                                        <Text style={{fontSize: 17}}>{reviewData.TestData.professor_name} 교수</Text>
                                    </View>
                                    <View style={styles.lecture_score_container}>
                                        <CustomRatingBar data={reviewData.LIDData}/>
                                        <View style={styles.review_writer_studentID}>
                                            <Text style={styles.review_writer}>22학년도 수강자</Text>
                                        </View>
                                    </View>
                                
                                    <View style={styles.lecture_review_content}>
                                        <Text>{reviewData.LIDData.review}</Text>
                                    </View>
                                </View>
                                <View style={styles.declartion_container}>
                                    <TouchableOpacity 
                                        style={styles.declartion_button}
                                        onPress={() => quit(reviewData)}
                                    >
                                        <Text>신고</Text>
                                    </TouchableOpacity>
                                </View>                                
                            </View>
                        </TouchableOpacity>
                    </View>
                ))
            );
        }
    }

    const showReview = () => {
        return (
            reviewDatas.map((reviewData) => reviewData.TestData.subject === search ? (
                <View style={{flex:0.5, justifyContent: 'center', marginTop: 30}}>
                    <TouchableOpacity 
                        style={styles.review}
                        onPress={() => navigation.navigate("ReviewInfo", reviewData)}
                    >
                        <View style={styles.lecture_list}>
                            <View style={styles.lecture_review_info}>
                                <View>
                                    <View style={styles.lecture_score_container}>
                                        <CustomRatingBar data={reviewData.LIDData}/>
                                        <View style={styles.review_writer_studentID}>
                                            <Text style={styles.review_writer}>22학년도 수강자</Text>
                                        </View>
                                    </View>
                                </View>
                                
                                <View style={styles.lecture_score_range}>
                                    <Text>학점 비율</Text>
                                    <View style={styles.lecture_score_range_background}>
                                        <Text style={{color: '#FFFFFF'}}>{reviewData.LIDData.difficulty}</Text>
                                    </View>
                                </View>
                                <View style={styles.lecture_review_content}>
                                    <Text>후기</Text>
                                    <Text style={{marginLeft: 45}}>{reviewData.LIDData.review}</Text>
                                </View>
                            </View>
                            <View style={styles.declartion_container}>
                                <TouchableOpacity 
                                    style={styles.declartion_button}
                                    onPress={() => quit(reviewData)}
                                >
                                    <Text>신고</Text>
                                </TouchableOpacity>
                            </View>                                
                        </View>
                    </TouchableOpacity>
                </View>
            ) : null
        ));
    }


    const setDeclation = (find, reviewData) => {
        if (find === KEY_FALSEREPORT) {
            handleChange(RUid.current, "FalseReport", "UID");
            handleChange(reviewData.UID, "FalseReport", "RUID");
            handleChange(reviewData.LIDData, "FalseReport", "LIDData");
            handleChange(reviewData.TestData, "FalseReport", "TestData");
            //console.log("신고 들어왔어요! : ", value);
            declationUpdate(reviewData.UID);

        } else if (find === KEY_SLANG) {
            handleChange(RUid.current, "Slang", "UID");
            handleChange(reviewData.UID, "Slang", "RUID");
            handleChange(reviewData.LIDData, "Slang", "LIDData");
            handleChange(reviewData.TestData, "Slang", "TestData");
            //console.log("신고 들어왔어요! : ", value);
            declationUpdate(reviewData.UID);
        } else if (find === KEY_DISRESPECT) {
            handleChange(RUid.current, "Disrespect", "UID");
            handleChange(reviewData.UID, "Disrespect", "RUID");
            handleChange(reviewData.LIDData, "Disrespect", "LIDData");
            handleChange(reviewData.TestData, "Disrespect", "TestData");
            //console.log("신고 들어왔어요! : ", value);
            declationUpdate(reviewData.UID);
        }
    }

    const declationUpdate = (uid) => {
        if (RUid.current !== uid) {
            setDoc(myDocDeclation, {"DeclarationInfo": arrayUnion(declation_review)}, {merge: true})
            .then(() => {   
                alert("신고 완료");
            })
            .catch((error) => alert(error.message));
        } else {
            alert("신고 실패!");
        }
    }

    const quit = (reviewData) => {
        console.log("신고 : ", reviewData);
        Alert.alert(
            "신고",
            "",
            [
              {
                text: "취소",
                style: "cancel"
              },
              { text: KEY_FALSEREPORT, 
                onPress: () => setDeclation(KEY_FALSEREPORT, reviewData)
                }, {
                    text: KEY_SLANG,
                    onPress: () => setDeclation(KEY_SLANG, reviewData)
                }, {
                    text: KEY_DISRESPECT,
                    onPress: () => setDeclation(KEY_DISRESPECT, reviewData)
                }
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.header}>
                <View style={styles.title_container}>
                    <View style={styles.title_logo}>
                        <TouchableOpacity>
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
                <View style={{flex: 1}}>
                    <ScrollView>
                        {search === "" ? showCurrentReview() : showReview()}
                    </ScrollView>
                </View>

            </View>
            <View style={styles.sub_container}>
                <TouchableOpacity style={{width: 40}} onPress={() => navigation.navigate("WriteReview")}>
                    <View style={styles.wirte_button}>
                        <FontAwesome name="pencil-square-o" size={24} color="white" />
                    </View>
                </TouchableOpacity>
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
        flex: 0.4,
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
        justifyContent: 'flex-end',
        marginLeft: 5,
    },
    review_writer: {
        color:'#B0B0B0',
        fontSize: 10,
        marginTop: 5
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
        marginTop: 10
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