import { Text, StyleSheet, View, KeyboardAvoidingView, Image } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { Input, Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { db, auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                navigation.replace("HomeScreen");
            }
        });
        return unSubscribe;
    }, []);



    const signIn = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error));
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />
            <Image source={require('../assets/logintranscroped.png')}
                style={{ width: 400, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input placeholder='Email' autoFocus type='email' value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder='Password' type='password' secureTextEntry value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={signIn} />
            </View>
            <Button containerStyle={styles.button} title='Login' onPress={signIn} />
            <Button onPress={() => { navigation.navigate("Register") }} containerStyle={styles.button} type='outline' title='Register' />
            <View style={{ height: 50 }} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});

export default LoginScreen;