import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input } from 'react-native-elements/dist/input/Input';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new Chat',
        })
    }, [navigation]);

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack();
        }).catch((error) => {
            alert(error)
        });
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a Chat Name"
                value={input}
                onChangeText={(text) => setInput(text)}
                leftIcon={<Icon
                    name="chat"
                    size={24}
                    color='black'
                />}
            />
            <Button onPress={createChat} title="Create a New Chat" containerStyle={styles.button}/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    button: {
        width: 100,
    },
})