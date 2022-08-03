import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { auth } from '../../db/DatabaseConfig/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export default function LoginScreen({navigation}) {
    const [values, setValues] = useState({
        email: "",
        pwd: ""
    })

    function handleChange(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    function Login() {
        const { email, pwd } = values;
        signInWithEmailAndPassword(auth, email, pwd)
        .then(() => {
            alert('로그인 성공');
        })
        .catch((error) => {
            alert(error.message)
        });
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
            <View style={styles.header}>
                <Text style={styles.title}>MATE</Text>
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
                        style={[styles.text_input, {marginBottom: 30}]}
                        secureTextEntry={true}
                        onChangeText={text => handleChange(text, "pwd")}
                    />
                </View>
                <View style={styles.button_container}>
                    <TouchableOpacity
                        style={[styles.button, {marginBottom: 10}]}
                        onPress={() => Login()}
                    >
                        <Text style={styles.button_text}>로그인</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("SignUpScreen")}
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
        flex: 1,
        backgroundColor: "#007AFF",
        borderBottomLeftRadius: 35,
        justifyContent: "center",
        alignItems: "center"
    },
    input_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text_input_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_input: {
        width: 329,
        height: 60,
        borderBottomWidth: 0.5,
        borderBottomColor: "gray", 
    },
    title: {
        fontSize: 58,
        fontWeight: "bold",
        color: "#FFFFFF",
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