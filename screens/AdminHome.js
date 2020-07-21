import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {getInfo} from '../components/Fb';
// import firebase from 'react-native-firebase'
import ListItems from '../components/ListItems'

export default class AdminHome extends React.Component{
   	constructor(props) {
	    super(props);
	    this.state = {
	      requests: []
	    }
    // this.handlePress = this.handlePress.bind(this);
    }

	handlePress = (all) =>{
		var stateCopy = Object.assign({}, this.state);
		stateCopy.requests = all
		this.setState(stateCopy)
		console.log("AdminHome", this.state.requests);
	}

    render() {
  
	    return (   	
            <View >
        	    <View >
        	    	<ListItems items = {this.state.requests}/>
        		</View>
	        	<View style = {styles.button}>
				        <Button 
				        	title="View Appointment Requests"
				        	onPress = {()=>getInfo(this.handlePress)}
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
   
})