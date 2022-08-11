import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Alert, ScrollView} from "react-native";
import { signOut } from "firebase/auth";
import { MaterialIcons } from '@expo/vector-icons';
import {useState, useEffect, useRef} from 'react';
import { db, auth } from "../../db/DatabaseConfig/firebase";
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import CustomRatingBar from "../../Component/start_rating/CustomRatingBar";
import React from 'react';


export default function ProfileScreen({navigation}) {
    const [ myReviews, setMyReviews ] = useState([]);
    const [ updateReviews, setUpdateReviews ] = useState({});
    const [ update, setUpdate ] = useState(false);
    // 리뷰 마다 번호 부여
    const [ reviewCount, setReviewCount ] = useState(0);

    const myDocUser = doc(db, "User", "UserInfo");
    const myDocReview = doc(db, "Review", "ReviewData");
    const myUid = useRef(0);


    let updateReviewRef = useRef({});
    let deleteReviewRef = useRef({});

    useEffect(() => {
        getUid();
        getReviewData();
    }, []);
    

    const getUid = async () => {
        let myEmail;
        onAuthStateChanged(auth, (user) => {
            myEmail = user.email; 
        });
        
       await getDoc(myDocUser)
        .then((snapshot) => {
            if (snapshot.exists) {
                snapshot.data().UserInfo.map((userDatas) => {
                    if (userDatas.email === myEmail) {
                        //setMyUid(uid);
                        myUid.current =  userDatas.UID;
                        //console.log(myUid.current);
                    }
                });
            } else {
                console.log("No Document!");
            }
        })
        .catch((error) => console.log(error.message));
    }


    const getReviewData = async () => {

        await getDoc(myDocReview)
        .then((snapshot) => {
            if (snapshot.exists) {
                snapshot.data().ReviewData.map((reviewData) => {
                    if (reviewData.UID === myUid.current) {          
                        //setMyReviews([...myReviews, reviewData.LIDData])
                        setMyReviews((myReviews) => [...myReviews, reviewData.LIDData]);                    
                        
                    } else {                                           
                        return ;
                    }
                })
            } else {
                console.log("No Document!");
            }
        })
        .catch((error) => console.log(error.message));
    }

    const onUpdateReview = async (review) => {

        await getDoc(myDocReview)
        .then((snapshot) => {
            if (snapshot.exists) {
                snapshot.data().ReviewData.map((reviewData) => {
                    if (reviewData.LIDData.reviewCount === review.reviewCount) {          
                        //setMyReviews([...myReviews, reviewData.LIDData])
                        
                        //setUpdateReviews(prev => {...prev, ...reviewData});
                        updateReviewRef.current = reviewData;
                    } else {                                           
                        return ;
                    }
                })
            } else {
                console.log("No Document!");
            }
        })
        .catch((error) => console.log(error.message));
    }

    const onDeleteReview = async (review) => {
        await getDoc(myDocReview)
        .then((snapshot) => {
            if (snapshot.exists) {
                snapshot.data().ReviewData.map((reviewData) => {
                    if (reviewData.LIDData.reviewCount === review.reviewCount) {          
                        //setMyReviews([...myReviews, reviewData.LIDData])
                        
                        //setUpdateReviews(prev => {...prev, ...reviewData});
                        deleteReviewRef.current = reviewData;
                        reviewDelete();
                    } else {                                           
                        return ;
                    }
                })
            } else {
                console.log("No Document!");
            }
        })
        .catch((error) => console.log(error.message));

    }

    const reviewDelete = () => {
        console.log("삭제 : ", deleteReviewRef.current);
            
        updateDoc(myDocReview, {"ReviewData": arrayRemove(deleteReviewRef.current)}, {merge: true})
        .then(() => {   
            alert("리뷰 삭제 완료");
            navigation.navigate("HomeScreen");
        })
        .catch((error) => alert(error.message));
        
    }

    const showMyReview = () => {
        return(
            myReviews.map(review => {
                //setReviewCount(prev => prev + 1);

                return (
                    <View style={styles.lecture_list}>
                        <View style={styles.lecture_review_info}>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <View style={{marginBottom: 5}}>
                                    <Text style={{fontSize: 22, marginBottom: 8}}>{review.subject}</Text>
                                    <Text style={{fontSize: 17}}>{review.professor_name} 교수</Text>
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <TouchableOpacity 
                                        style={{backgroundColor: '#007AFF', padding: 10, borderRadius: 12, marginRight: 10}}
                                        onPress={async () => {      
                                            await onUpdateReview(review);   
                                            console.log("show review : ", updateReviewRef.current);                           
                                            navigation.navigate("UpdateReview", updateReviewRef.current)
                                        }}
                                    >
                                        <Text style={{color:"white"}}>수정</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={{backgroundColor: '#007AFF', padding: 10, borderRadius: 12, marginRight: 10}}
                                        onPress={async () => {  
                                            await onDeleteReview(review);                                            
                                            console.log("show Delete review : ", deleteReviewRef.current);                           
                                        }}
                                    >
                                        <Text style={{color:"white"}}>삭제</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.lecture_score_container}>
                                <CustomRatingBar data={review}/>
                                <View style={styles.review_writer_studentID}>
                                    <Text style={styles.review_writer}>22학년도 수강자</Text>
                                </View>
                            </View>
                        
                            <View style={styles.lecture_review_content}>
                                <Text>{review.review}</Text>
                            </View>
                        </View>                               
                    </View>
                )
            
            })
        );
    }

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


    console.log( "update Review Data : ", updateReviewRef.current);
    console.log( "review count : ", reviewCount);

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
                   <Text style={styles.my_lecture}>내가 작성한 강의</Text>
                </View>
                <ScrollView style={{flex: 1}}>
                    {showMyReview()}        
                </ScrollView>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    my_lecture:{
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft:20,
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
        flex: 0.1,
        justifyContent: 'center',
    },
    bottom_line_: {
        flexDirection:'row',
        alignItems:'flex-end',
    },
    bottom_line: {
        borderBottomColor: '#DBDBDB',
        borderBottomWidth: 1,
    },
    lecture_container: {
    flex:0.2,
    justifyContent: 'center',
    },

    lecture_list: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#DBDBDB',
        borderBottomColor: '#DBDBDB',
        
    },

    lecture_review_info: {
        flex: 1,
        paddingLeft: 30,
        paddingTop: 10,
    },

    lecture_score_container: {
        flexDirection: 'row'
    },

    review_writer_studentID: {
        justifyContent: 'flex-end',
        marginLeft: 5,
    },

    lecture_review_content: {
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    lecture_tittle:{
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft:20,
    },
    star: {
        backgroundColor: 'yellow'
    },
    lecture_review_tiny: {
        fontWeight: 'bold',
        fontSize: 13,
        marginLeft:20,
    },
    asd: {
        flex: 0.1,
        borderBottomColor: '#DBDBDB',
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
});
