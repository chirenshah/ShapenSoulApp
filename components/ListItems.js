import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from 'prop-types';

function ListItems(props){ 
    return (  
    	<View style = {styles.list} >
    		<Text style = {styles.text}>{props.items}</Text>
    	</View>    
    )
}

export default ListItems

const styles = StyleSheet.create({
    text:{
    	fontSize:18,
        color: 'blue',


    },
    list:{
    	backgroundColor: '#d4fff4',
        height: 100,
        padding: 15,
        margin: 30
    }
})