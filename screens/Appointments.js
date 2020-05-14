import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer'
import Calendar from './Calendar'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


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

const Stack1 = createStackNavigator()

export default class Appointments extends React.Component {
  render() {
    return (   	
    	<NavigationContainer independent = {true}>
    		<Stack1.Navigator>
    			<Stack1.Screen name = "Appointment" component = {Appointment} options={{ title: 'Appointments' }}/>
    			<Stack1.Screen name = "Calendar" component = {Calendar}   options={{ title: 'Calendar' }}/>
    		</Stack1.Navigator>
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