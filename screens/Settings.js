import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';
import {signout} from '../components/Fb'
import {LoginScreen} from './Login'
//import {UserProfile} from './Profile'
//import { useNavigation } from '@react-navigation/native';

export default class Settings extends Component
{
	onSignedOut = () =>{
		this.props.navigation.navigate('Login')
	}
	render(){
		return (   	
			<View>

			<TouchableOpacity
				onPress = {() =>{signout(this.onSignedOut);} }
				>
				<Text> Logout</Text>
			</TouchableOpacity>

		</View>
		)
	}
	}
			

