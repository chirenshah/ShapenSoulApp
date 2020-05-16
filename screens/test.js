import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';
import {signout} from '../components/Fb'
import {LoginScreen} from './Login'
import {UserProfile} from './Profile'
//import { useNavigation } from '@react-navigation/native';
import {getUsers} from  '../components/Fb'

export default class Test extends Component {
 componentDidMount(){
     getUsers(this.UsersRetreived)
 }

 UsersRetreived = (User) =>{
    console.log(User)
 }

    render(){
			return (   	
				<View>
                    <Button title="TEst" onPress={getUsers}  />
			    </View>
		)
    }
}