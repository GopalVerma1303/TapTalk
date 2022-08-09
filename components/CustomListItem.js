import { StyleSheet, Text, View, Button } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
      const unsubscribe = db
      .collection('chats')
      .doc(id)
      .collection('messages')
      .onSnapshot((snapshot) => 
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );
      return unsubscribe;
    });
    

    return (
        <ListItem onPress={()=>enterChat(id, chatName)} key={id} buttomDivider>
            <Avatar rounded source={{
                uri: chatMessages?.[0]?.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }} />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '800'}}>{chatName}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode={'tail'}>{chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message.input}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};

export default CustomListItem

const styles = StyleSheet.create({})