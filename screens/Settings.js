import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';
import {signout} from '../components/Fb'
import {LoginScreen} from './Login'
import {UserProfile} from './Profile'
//import { useNavigation } from '@react-navigation/native';

const screens ={
	Login: {LoginScreen},
	UserProfile: {UserProfile}
}

export default function Settings({navigation: { navigate }}) {
	  
			return (   	
				<View>
				
				<TouchableOpacity
					onPress = {() => { navigate('UserProfile')} }
					>
					<Text> Update Profile </Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress = {() =>{ signout(); navigate('Login')} }
					>
					<Text> Logout</Text>
				</TouchableOpacity>

			</View>
		)
	}

