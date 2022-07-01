import { View, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard, Touchable } from "react-native";
import { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({navigation}) {
    const [search, setSearch] = useState("");
    const [list, setList] = useState();
    
    const lecture_list = require('./Lecture.json').lecture_list;

    const searchLecture = (text) => {
        if (text) {
            lecture_list.filter(element => element.subject_name === text ? setList(element) : null);
            setSearch(text);
            console.log(list)
        } else {
            setSearch('');
            setList();
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.title_container}>
                    <Text style={styles.title}>MATE</Text>
                </View>
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
                                <Text style={styles.lecture_score}>평균</Text>
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
            <View style={styles.footer}>
                <View style={styles.nav}>
                    <TouchableOpacity>
                        <MaterialIcons name="rate-review" size={40} color="#A6CFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Entypo name="home" size={40} color="#A6CFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome5 name="clipboard-list" size={40} color="#A6CFFF" />
                    </TouchableOpacity>
                </View>
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
    title_container: {
        flex: 1.5,
        justifyContent: 'center',
    },
    title: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 35,
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
        flex: 0.2,
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
    },
    lecture_review_content: {
        marginTop: 5,
    },
    lecture_list_nonContest: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lecture_list_nonContest_text: {
        fontSize: 25,
    }, 
    footer: {
        flex: 0.5,
        borderTopWidth: 1,
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
    nav: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
    
});