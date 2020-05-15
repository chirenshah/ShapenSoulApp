import React, { Component } from 'react'
import {
    View, 
    Text, 
    TouchableOpacity,
    TextInput ,
    StyleSheet ,
    Picker,
    Button 
    } from 'react-native'

import {signup} from '../components/Fb'

export default class SignUpScreen extends React.Component{
    state = {
        email:"",
        password:""
    }
    render(){
        return(
            <View style={{backgroundColor:"white",
            height:800}}>
                <View style={styles.logo}>
                <Text style={{fontSize:50}}>Shape N Soul</Text>
                </View>
                <View style={styles.container}>
                    <TextInput placeholder="Email" style={styles.input}
                    value={ this.state.email }
                    onChangeText={(text) =>{
                    this.setState({email:text})
                    }} />
                    <TextInput placeholder="Password" style={styles.input}
                    value={ this.state.password }
                    secureTextEntry={true}
                    onChangeText={(text) =>{
                    this.setState({password:text})
                    }} />
                    <TextInput placeholder="Re-enter Password" style={styles.input}
                    value={ this.state.password }
                    secureTextEntry={true}
                    onChangeText={(text) =>{
                    this.setState({password:text})
                    }} />
                    <View style={styles.button}>
                        <Button title="Signup" onPress={() => {
                            signup(this.state.email,this.state.password)
                            }} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        padding:10,
        margin:10,
        alignSelf:'center',
        width:300,
        height:50,
        textAlign:"center",
        backgroundColor:"#e8eeef"
    },
    container:{
        marginTop:140
    },
    logo:{
        marginTop:100,
        alignSelf:"center"
    },
    button:{
        alignSelf:"center",
        margin:5,
        padding:20,
        width:200,
    },
    signup:{
        alignSelf:"center",
        color:"blue",
        fontSize:18
    }
})