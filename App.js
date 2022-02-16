import Pusher from 'pusher-js/react-native';

import { StatusBar } from 'expo-status-bar';
import React, {useState, useCallback, useEffect } from "react";
import {Button, StyleSheet, Text, TouchableOpacity, Vibration, View} from 'react-native';
import * as Google from 'expo-google-app-auth';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import { GiftedChat } from 'react-native-gifted-chat'


const Stack = createNativeStackNavigator();


function ExampleChat(props) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {

        let pusher = new Pusher('54b390630895bf04e224', {
            cluster: 'ap2'
        });

        let channel = pusher.subscribe('my-channel');

        channel.bind('my-event', function(data) {
            //document.querySelector('div').innerHTML = data.message;
            //console.log('---->',data);


            setMessages([
                {
                    _id: Math.floor(Math.random() * 100),
                    text: data.message,
                    createdAt: new Date(),
                    user: {
                        _id: data.id,
                        name: data.name,
                        avatar: data.avatar,
                    },
                },
            ])

        });




    }, [])

    const onSend = useCallback((messages = []) => {

        //alert(messages)
        console.log('2---->',messages[0].user);

        (async () => {
            const rawResponse = await fetch('http://tanvirpro.com/chat_rc/pusher.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: messages[0].user._id,
                    name: messages[0].user.name,
                    avatar: messages[0].user.avatar,
                    message: messages[0].text
                }

                )
            });
            const content = await rawResponse.json();

            console.log(content);
        })();



        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: props.datas.id,
                name: props.datas.name,
                avatar: props.datas.photoUrl,
            }}
        />
    )
}


const HomeScreen = ({ navigation }) => {

    const handleGoogleSignIn = () => {
        const config = {
            iosClientId: '288984494746-j764n2i9oohq212j8mhoiu0vpcqn9m90.apps.googleusercontent.com',
            androidClientId: '288984494746-9a7nkebfd9ejve7j61m35ibmis1ukel4.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        };

        Google
            .logInAsync(config)
            .then((result)=>{
                const {type, user} = result;

                if (type === 'success') {

                    const {email, name, photoUrl, id} = user;

                    //alert('google sign in successfully')

                    navigation.navigate('Profile', { email, name, photoUrl, id })

                }else {
                    alert('google sign in canceled')
                }
            })
            .catch(error=>{
                console.log(error)
                alert('error')
            })
    }


    return (
        <View>
            {/*<Text style={{fontSize:100, color: '#c90f0f'}}>ddd</Text>*/}
            <Button
                title="Google sign in!"
                onPress={handleGoogleSignIn}
            />
        </View>
    );
};

const ProfileScreen = ({ navigation, route }) => {
    return (
        <View style={{
            flex: 2,
        }}>
            <Text>This is {route.params.name}'s profile</Text>
            <ExampleChat datas={route.params}/>
        </View>
    );
};


const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Welcome' }}
                />

                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const App = () => {

    return (
        <View style={{
            flex: 2,
        }}>

            <MyStack/>




        </View>
    );
}

export default App;
