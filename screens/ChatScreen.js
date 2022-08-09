import { KeyboardAvoidingView, StyleSheet, Text, View, Platform, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useLayoutEffect, useState, useRef } from 'react'
import { Avatar } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { AntDesign, Ionicons } from "react-native-vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app';

const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Avatar rounded source={{ uri: messages[0]?.data.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} />
                    <Text style={{ color: 'white', fontWeight: '500' }}>  {route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 80, marginRight: 10 }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='videocamera' size={20} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Ionicons name='call' size={20} color='white' />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation, messages]);

    const sendMessage = () => {
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: { input },
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        });

        setInput("");
    };

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            ));
        return unsubscribe;
    }, [route]);

    const scrollViewRef = useRef();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : "height"} style={styles.container} keyboardVerticalOffset={90}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView
                            contentContainerStyle={{ paddingTop: 15 }}>
                            {messages.map(({ id, data }) =>
                                data.email === auth.currentUser.email ? (
                                    <View style={styles.reciever} key={id}>
                                        <Avatar
                                            rounded
                                            position='absolute'
                                            //WEB
                                            containerStyle={{
                                                position: 'absolute',
                                                bottom: -15,
                                                right: -5,
                                            }}
                                            size={30}
                                            bottom={-15}
                                            right={-5}
                                            source={{
                                                uri: data.photoURL || "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1659773876~exp=1659774476~hmac=1d39241cf95cd90ee8eebfaf94380dd83557d5f70d1455d40b185df1b7a0819a",
                                            }} />
                                        <Text style={styles.recieverText}>{data.message.input}</Text>
                                    </View>
                                ) : (
                                    <View style={styles.sender} key={id}>
                                        <Avatar
                                            rounded
                                            position='absolute'
                                            //WEB
                                            containerStyle={{
                                                position: 'absolute',
                                                bottom: -15,
                                                left: -5,
                                            }}
                                            size={30}
                                            bottom={-15}
                                            left={-5}
                                            source={{
                                                uri: data.photoURL || "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1659773876~exp=1659774476~hmac=1d39241cf95cd90ee8eebfaf94380dd83557d5f70d1455d40b185df1b7a0819a",
                                            }} />
                                        <Text style={styles.senderText}>{data.message.input}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )
                            )}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput onSubmitEditing={sendMessage} value={input} onChangeText={(text) => setInput(text)} placeholder="Enter message here" style={styles.textInput} />
                            <View style={{ width: '3%' }}><Text> </Text></View>
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name='send' size={24} color='#2b68e6' />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        marginBottom: 5,
    },

    textInput: {
        width: '90%',
        bottom: 0,
        height: 40,
        borderColor: 'transparent',
        backgroundColor: '#ececec',
        borderWidth: 1,
        padding: 10,
        color: 'grey',
        borderRadius: 30,
    },

    recieverText: {
        color: "black",
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15,
    },

    senderText: {
        color: "white",
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15,
    },

    senderName: {
        left: 10,
        paddingRight: 19,
        fontSize: 10,
        color: 'white',
    },

    reciever: {
        padding: 15,
        backgroundColor: "#ececec",
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',
    },
    sender: {
        padding: 15,
        backgroundColor: "#2b68e6",
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginLeft: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',
    },
})