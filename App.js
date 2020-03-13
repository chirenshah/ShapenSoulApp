import React, { Component } from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import PDF from './components/PDF'
import FB from './components/Fb'
import firebase from 'react-native-firebase'

export default function App() {
    state = {
        User:{
            name:"Chiren"
        },
        userList:[]
    }

    function addUser(user) {
        console.log("User Added")
        console.log(user)
    }

    async function readUsers() {
        var snapshot = await firebase.firestore()
                .collection('Users')
                .get()
        snapshot.forEach((data) => {
            const userItem = data.data()
            this.state.userList.push(userItem)
        });
        console.log(userList);
    }
        return(
        <View>
            <Text> Working?</Text>
            <Button onPress={readUsers}
                title="Find User"
            />
                <TextInput placeholder="NAME"
                    value={ this.state.User.name }
                onChangeText={(text) => 
                    this.setState((prevState) => ({
                        name : prevState.User.name = text
                    }))
                }
                />
            <Text>{this.state.User.name}</Text>
            </View>
            )
    }