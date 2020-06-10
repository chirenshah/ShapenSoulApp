import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import uuid4 from 'uuid/v4';

//const Stack = createStackNavigator()

export default class Admin extends React.Component {

	  render() {
	  	
	    return (   	
	    <View>
	    <Text> ADMIN TEST </Text>
	    <TouchableOpacity
					onPress = {() => check()}
					>
					<Text> Check</Text>

				</TouchableOpacity>
		</View>
		)
	}}


const styles = StyleSheet.create({
    head:{
    	fontSize: 25,
    	padding: 20
    },
    button:{
    	alignSelf:"center",
        width: 400,
        padding: 20,
        marginTop:490

    },
   
})