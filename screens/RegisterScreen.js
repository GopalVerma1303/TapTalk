import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import React, { Component, useState, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, Input, Button, Image } from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imgurl, setImgurl] = useState("")


    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to login screen',
        });
    }, [navigation]);

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: fullname,
                    photoURL: imgurl || "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1659773876~exp=1659774476~hmac=1d39241cf95cd90ee8eebfaf94380dd83557d5f70d1455d40b185df1b7a0819a",
                })
            })
            .catch(error => alert(error.message));
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{ textAlign: 'center', color: '#2492e9', }}>Create Account</Text>
            <View style={styles.inputContainer}>
                <View style={{ height: 40, }}></View>
                <Input placeholder='Full Name' type='text' value={fullname} onChangeText={(text) => setFullname(text)} />
                <Input placeholder='Email' type='email' value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder='Password' secureTextEntry type='password' value={password} onChangeText={(text) => setPassword(text)} />
                <Input placeholder='Profile Picture URL' type='text' value={imgurl} onChangeText={(text) => setImgurl(text)} />
            </View>
            <Button containerStyle={styles.button} title='Register' raised onPress={register} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20,
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})

export default RegisterScreen