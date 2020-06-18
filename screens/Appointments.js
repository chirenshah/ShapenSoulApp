import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer'
import Calendar from './Calendar'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {subscribeToAuthChanges} from '../components/Fb'

function Appointment({navigation}){
	return(
		<View>
	       <Text>APPOINTMENTS</Text>
	       <View style = {styles.button}>
		        <Button 
		        	title="Book Appointment"
		        	onPress={() => navigation.navigate('Calendar')}
		        />
	 		</View>
		</View>
		)
} 


const Stack = createStackNavigator()

export default class Appointments extends React.Component {
	
	componentDidMount(){
	    subscribeToAuthChanges(this.authStateChanged)
	}

	authStateChanged = (user) => {
		//console.log(user)
	}

	  render() {
	    return (   	
	    	<NavigationContainer independent = {true}>
	    		<Stack.Navigator>
	    			<Stack.Screen name = "Appointment" component = {Appointment} options={{ title: 'Appointments' }}/>
	    			<Stack.Screen name = "Calendar" component = {Calendar}   options={{ title: 'Calendar' }}/>
	    		</Stack.Navigator>
	    	</NavigationContainer>
		)
	}}


const styles = StyleSheet.create({
    button:{
    	alignSelf:"center",
        width: 400,
        padding: 20,
        marginTop:490

    },
   
})