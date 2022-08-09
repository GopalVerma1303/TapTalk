import React, {useLayoutEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen  from '../TapTalk/screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { db, auth } from './firebase';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#346eeb"},
  headerTitleStyle : {color: 'white'},
  headerTintColor:  'white',
  headerTitleAlign: 'center',
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      // initialRouteName="HomeScreen" 
      screenOptions={globalScreenOptions} >
        <Stack.Screen name="Login" component={LoginScreen} options={{}}/>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'My Home' }}/>
        <Stack.Screen name="AddChat" component={AddChatScreen} options={{ title: 'New Chat' }}/>
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
