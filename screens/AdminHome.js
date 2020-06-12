import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
//import Admin from './Admin'
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import {getInfo} from '../components/Fb';
import firebase from 'react-native-firebase'

// const Stack = createStackNavigator()

export default class AdminHome extends React.Component{
	
	
    render() {
	  	
	    return (   	
            <View >
        	    <View style = {styles.card}>
        	    	<Text> Appointment 1 </Text>
        		</View>
        	<View style = {styles.button}>
			        <Button 
			        	title="View Appointment Requests"
			        	onPress={() => getInfo()}
			        />
		 	</View>
            </View>
            
		)
	}
}

const styles = StyleSheet.create({
    button:{
    	alignSelf:"center",
        width: 400,
        padding: 20,
        marginTop:400

    },

    card:{
        
        backgroundColor: '#f1f2f6',
        height: 100,
        padding: 15,
        margin: 30
    }
   
})