import { View, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import { useState, useEffect } from "react";
import {auth} from '../../db/DatabaseConfig/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../db/DatabaseConfig/firebase';
import { doc, setDoc, arrayUnion, getDoc } from 'firebase/firestore';

export default function SignUpScreen({navigation}) {
    const [value, setValue] = useState({
        email: "",
        pwd: "",
        department: "",
        studentId: "",
        name: "",

    });

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



    const SignUp = () => {
        validationUser();
        const {email, pwd, department, studentId, name} = value;
        const myDoc = doc(db, 'User', 'UserInfo');
        
        console.log('검증 : ', validation);
        if (validation === true) {
            setDoc(myDoc, {"UserInfo": arrayUnion(value)}, {merge: true})
            .then(() => alert("회원 등록"))
            .catch((error) => alert(error.message));
    
            createUserWithEmailAndPassword(auth, email, pwd)
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
            //console.log("DB에서 불러온 유저 정보 : ", snapshot.data().UserInfo);
            snapshot.data().UserInfo.forEach(element => {
                if (value.name !== "" && value.studentId !== "" && value.department !== "" && value.studentId !== element.studentId) {
                    setValidation(true);
                } else {
                    setValidation(false);
                }
            });
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
                        onChangeText={text => handleChange(text, "pwd")}
                    />
                    <TextInput
                        placeholder="학과"
                        style={styles.text_input}            
                        onChangeText={text => handleChange(text, "department")}
                    />
                    <TextInput
                        placeholder="학번"
                        style={styles.text_input}            
                        onChangeText={text => handleChange(text, "studentId")}
                    />
                    <TextInput
                        placeholder="이름"
                        style={styles.text_input}
                        onChangeText={text => handleChange(text, "name")}
                    />
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