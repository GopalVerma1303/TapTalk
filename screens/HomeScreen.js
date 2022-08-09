import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {

    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapShot => (
            setChats(snapShot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ))
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "TapTalk",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerTitleAlign: 'center',
            headerLeft: () => (
                <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL || "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1659773876~exp=1659774476~hmac=1d39241cf95cd90ee8eebfaf94380dd83557d5f70d1455d40b185df1b7a0819a" }} />
                    </TouchableOpacity>
                </View>
            ),
            headerTitle: () => (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Image source={require('../assets/titleblackcrop.png')}
                        style={{ width: 150, height: 30 }}
                    />
                </View>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 80, marginRight: 10 }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={20} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                        <SimpleLineIcons name='pencil' size={20} color='black' />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName,
        });
    };

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {}
})