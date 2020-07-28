import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import PropTypes from 'prop-types';
// import {ApptBook} from './Fb.js'

function ListItems(props){ 
    return (  
        
    	<View style = {styles.list} >
    		<Text style = {styles.text}>{props.items}</Text>
            <View style = {styles.buttons}>
                <TouchableOpacity
                    style = {styles.acceptButton}
                    onPress = {()=>  console.log("ListItems: Booked!")}
                    >
                    <Text style = {styles.buttonText}>BOOK</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style = {styles.reButton}
                    onPress = {()=> console.log("ListItems: Reschedule")}
                    >
                    <Text style = {styles.buttonText}>RESCHEDULE</Text>
                </TouchableOpacity>
            </View>
    	</View>    
    )
}

export default ListItems

const styles = StyleSheet.create({
    text:{
    	fontSize:20,
        color: 'blue',
    },

    buttonText:{
        fontSize: 15,
        color: 'white'
    },

    list:{
    	backgroundColor: '#d4fff4',
        height: 100,
        padding: 10,
        margin: 30
    },

    buttons:{
        flexDirection: 'row'
    },

    acceptButton:{
        width: 100,
        margin: 10,
        backgroundColor: '#7dd459',
        alignItems: 'center',
        padding: 7
    },

    reButton:{
        width: 130,
        margin: 10,
        backgroundColor: '#db635a',
        alignItems: 'center',
        padding: 7
    }
})