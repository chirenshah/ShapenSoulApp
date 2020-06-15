import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import uuid4 from 'uuid/v4';

//const Stack = createStackNavigator()

export default class Admin extends React.Component {

	  render() {
	  	
	    return (   	
            <View style = {{flex: 1, }}>
        	    <View style = {styles.card}>

        	       <Text> ADMIN TEST </Text>
        	    
        		</View>
            </View>
		)
	}}


const styles = StyleSheet.create({
    
    button:{
    	alignSelf:"center",
        width: 400,
        padding: 20,
        marginTop:490

    },
    card:{
        
        backgroundColor: 'white',
        height: 100,
        padding: 15,
        margin: 30
    }
   
})