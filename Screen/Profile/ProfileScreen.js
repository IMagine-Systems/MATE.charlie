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
                   <Text style={styles.my_lecture}>내기 작성한 강의</Text>
                        <View style={styles.bottom_line_}>
                           <View style={styles.bottom_line}>
                           </View>
                        </View>
                </View>

                <View style={styles.lecture_container}>
                    
                      <Text style={styles.lecture_tittle}>간호관리학2</Text>
                      <Text style={styles.lecture_tittle}>000 교수</Text>
                      <Text style={styles.lecture_tittle}>별</Text>      
                      <Text style={styles.lecture_review_tiny}>별</Text> 
                      <Text style={styles.lecture_review_tiny}>별</Text>   
                      <View style={styles.asd}>
                      <View style={styles.bottom_line_}>
                           <View style={styles.bottom_line}></View>
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
        borderBottomColor: '#DBDBDB',
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
    bottom_line_: {
        flexDirection:'row',
        alignItems:'flex-end',
    },
    bottom_line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    },
    lecture_container: {
    flex:0.2,
    justifyContent: 'center',
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
