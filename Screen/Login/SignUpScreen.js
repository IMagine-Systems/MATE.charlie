import { View, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import { useState, useEffect } from "react";
import {auth} from '../../db/DatabaseConfig/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../db/DatabaseConfig/firebase';
import { doc, setDoc, arrayUnion, getDoc } from 'firebase/firestore';

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

    const [ genderBtn, setGenderBtn ] = useState("");

    const [ validation, setValidation ] = useState(false);
    
    useEffect(() => {
        validationUser();
    }, []);

    const handleChange = (text, eventName) => {
        setValue(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    const handleButton = (text, eventName) => {
        setGenderBtn(text);
        setValue(prev => {
            return {
                ...prev,
                [eventName] : text
            }
        })
    }


    const SignUp = () => {
        validationUser();
        const {UID, email, password, department, student_id, name, gender, point} = value;
        const myDoc = doc(db, 'User', 'UserInfo');
        
        if (validation === true) {
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

    
    const validationUser = () => {
        const myDoc = doc(db, 'User', 'UserInfo');

        getDoc(myDoc)
        .then((snapshot) => {
          if (snapshot.exists) {
            if (snapshot.data().UserInfo.length === 0) {
                value.UID = snapshot.data().UID;
                setValidation(true);
            } else {
                snapshot.data().UserInfo.forEach(element => {
                    if (value.name !== "" && value.student_id !== "" && value.department !== "" && value.student_id !== element.student_id && value.gender !== "") {
                        value.UID = snapshot.data().UID;
                        setValidation(true);
                    } else {
                        setValidation(false);
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>회원가입</Text>
            </View>
            <View style={styles.input_container}>
                <View style={styles.text_input_container}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    header: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
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
    gender_button_container: {
        flexDirection:'row'
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