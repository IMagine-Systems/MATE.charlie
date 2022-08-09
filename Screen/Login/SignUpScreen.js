import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import { useState, useEffect, useRef } from "react";
import {auth} from '../../db/DatabaseConfig/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../db/DatabaseConfig/firebase';
import { doc, setDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen({navigation}) {
    const [value, setValue] = useState({
        UID : 0,
        email: "",
        password: "",
        department: "",
        student_id: "",
        name: "",
        gender: "",
        point: 0,

    });

    // let value = {
    //     UID : 0,
    //     email: "",
    //     password: "",
    //     department: "",
    //     student_id: "",
    //     name: "",
    //     gender: "",
    //     point: 0,

    // };

    const [ genderBtn, setGenderBtn ] = useState("");

    //const [ validation, setValidation ] = useState(false);
    // useRef 활용
    const validation = useRef(false);
    //let validation = false;

    useEffect(() => {
    }, []);

    const handleChange = (text, eventName) => {
        setValue(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
        //value[eventName] = text
    }

    const handleButton = (text, eventName) => {
        setGenderBtn(text);
        console.log("성별 : ",text);
        setValue(prev => {
            return {
                ...prev,
                [eventName] : text
            }
        })
        //value[eventName] = text;
        console.log(value);
    }

    
    
    const validationUser = async () => {
        const myDoc = doc(db, 'User', 'UserInfo');
        
        await getDoc(myDoc)
        .then((snapshot) => {
            if (snapshot.exists) {
                if (snapshot.data().UserInfo.length === 0) {
                    console.log("검증 진행 : ", value);
                    value.UID = snapshot.data().UID;
                    //setValidation(true);
                    if (value.name !== "" && value.student_id !== "" && value.department !== "" && value.gender !== "") {
                        value.UID = snapshot.data().UID;
                        //setValidation(true);
                        validation.current = true;
                    } else {
                        //setValidation(false);
                        validation.current = false;
                    }
                } else {
                    console.log("d", value);
                    snapshot.data().UserInfo.forEach(element => {
                        if (value.name !== "" && value.student_id !== "" && value.department !== "" && value.gender !== "") {
                            value.UID = snapshot.data().UID;
                            //setValidation(true);
                            validation.current = true;
                        } else {
                            //setValidation(false);
                            validation.current === false;
                        }
                    });
                }
            } else {
                alert("No Document");
            }
        })
        .catch((error) => {
            alert(error.message);
        });
    }
    
    const SignUp = async () => {
        await validationUser();
        const {UID, email, password, department, student_id, name, gender, point} = value;
        const myDoc = doc(db, 'User', 'UserInfo');
        console.log("SignUp 검증 끝: " , validation.current);

        if (validation.current === true) {
            setDoc(myDoc, {"UID" : value.UID+1, "UserInfo": arrayUnion(value)}, {merge: true})
            .then(() => alert("회원 등록"))
            .catch((error) => alert(error.message));
    
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("계정회원 가입 성공!");
                navigation.replace("LoginScreen");
            })
            .catch((error) => {
                alert("이메일 혹은 비밀번호가 틀렸습니다.");
            });
        } else {
            alert("회원가입 실패했습니다.");
        }
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.header}>           
                <Text style={styles.title}>회원가입</Text>
                <TouchableOpacity 
                    style={styles.back_icon}       
                    onPress={() => navigation.navigate("LoginScreen")}          
                >
                    <Ionicons name="arrow-back-outline" size={32} color="black" />
                </TouchableOpacity>                
            </View>
            <View style={styles.input_container}>
                <ScrollView>
                    <TextInput 
                        placeholder="Email"
                        style={styles.text_input}
                        onChangeText={text => handleChange(text, "email")}
                        
                    />
                    <TextInput
                        placeholder="Password"
                        style={styles.text_input}
                        secureTextEntry={true}
                        onChangeText={text => handleChange(text, "password")}
                    />
                    <TextInput
                        placeholder="학과"
                        style={styles.text_input}            
                        onChangeText={text => handleChange(text, "department")}
                    />
                    <TextInput
                        placeholder="학번"
                        style={styles.text_input}            
                        onChangeText={text => handleChange(text, "student_id")}
                    />
                    <TextInput
                        placeholder="이름"
                        style={styles.text_input}
                        onChangeText={text => handleChange(text, "name")}
                    />
                </ScrollView>
                <View style={styles.gender_button_container}>
                        <TouchableOpacity
                            style={genderBtn !== "male" ? styles.gender_button : styles.select_gender_button}
                            onPress={() => handleButton("male", "gender")}
                        >
                            <Text style={genderBtn !== "male" ? null : styles.select_gender_button_text }>남성</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={genderBtn !== "female" ? styles.gender_button : styles.select_gender_button}
                            onPress={() => handleButton("female", "gender")}
                        >
                            <Text style={genderBtn !== "female" ? null : styles.select_gender_button_text }>여성</Text>
                        </TouchableOpacity>
                    </View>
                <View style={styles.button_container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => SignUp()}
                    >
                        <Text style={styles.button_text}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    header: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',

    },
    title: {
        fontSize: 32,
    },
    input_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text_input_container: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_input: {
        width: 329,
        height: 60,
        borderBottomWidth: 0.5,
        borderBottomColor: "gray", 
        marginBottom: 25,
    },
    back_icon: {
        position: 'absolute',                
        flexDirection: 'row',                    
        width: '100%',
        justifyContent: 'flex-end',
        right: 30,
    },
    gender_button_container: {
        flexDirection:'row',
        marginBottom: 20,
    },
    gender_button: {
        backgroundColor: '#DADADA',
        marginRight: 10,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    select_gender_button: {
        backgroundColor: '#007AFF',
        marginRight: 10,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    select_gender_button_text: {
        color: '#FFFFFF',
    },
    button_container: {
        flex: 1,
        marginBottom: 80,
    },
    button: {
        width: 300,
        height: 53,
        backgroundColor: "#007AFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
    button_text: {
        color: "#FFFFFF",
        fontSize: 17,
    }
});