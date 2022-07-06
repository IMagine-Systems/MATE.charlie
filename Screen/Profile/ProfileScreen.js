import { View, StyleSheet, Text, TouchableOpacity, TextInput} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {useState, useEffect} from 'react';
import { SafeAreaView } from "react-navigation";

export default function WriteReview({navigation}) {
    const [selectValue, setSelectValue] = useState('강의평가');

    useEffect(() => {
    }, [selectValue])


    //아직 레이아웃만 완료됨

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
            </View>
        
            <View style={styles.point_container}>
                   <View style={styles.point_tittle}>
                      <Text style={styles.point_text_h3}>내 포인트 내역</Text>
        
                      <Text style={styles.point_num}>총 포인트</Text>
                     </View>
                <View style={styles.lecture_select_container_top}>
                </View>

                <View style={styles.point_article}>
                <View style={styles.lecture_select_container_bottom}>
                </View>
                </View>


            </View>




        <View style={styles.review_container}>

        </View>
     </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flex: 0.2,
        backgroundColor: '#FFFFFF',
        marginLeft: 20,
        marginRight: 20,
    },
    title_container: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
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
        alignItems: 'flex-end',
    },
    point_container: {
        flex: 1,
        backgroundColor: 'green',
    },
    review_container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    point_tittle: {
        flex: 0.1,
        backgroundColor: 'yellow',
        flexDirection: 'row',
    },
    point_text_h3:{
        flex:0.5,
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft:20,
    },
    point_num:{
        flex:0.5,
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 20,
    },
    lecture_select_container_top: {
        position: 'fixed',
        borderBottomColor: '#DBDBDB',
        borderBottomWidth: 1,
        marginLeft:20,
        marginRight: 20,
    },
    point_article: {
        flex: 0.9,
    },
    lecture_select_container_bottom: {
        position: 'fixed',
        borderBottomColor: 'red',
        borderBottomWidth: 5,
        marginLeft:20,
        marginRight: 20,
    },
});
