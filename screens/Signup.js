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
        Name:"",
        email:"",
        password:"",
        password2:""
    }

    validation = () => {
        if(this.state.password == this.state.password2){
            signup(this.state.email,this.state.password,this.state.Name)
        }
        else{
            return(
                <View><Text style={styles.error}>password do not match</Text></View>
            )
        }
    }
    render(){
        return(
            <View style={{backgroundColor:"white",
            height:800}}>
                <View style={styles.logo}>
                <Text style={{fontSize:50}}>Shape N Soul</Text>
                </View>
                <View style={styles.container}>
                <TextInput placeholder="Name" style={styles.input}
                    value={ this.state.email }
                    onChangeText={(text) =>{
                    this.setState({Name:text})
                    }} />
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
                    this.setState({password2:text})
                    }} />
                    <View style={styles.button}>
                        <Button title="Signup" onPress={() => {
                            
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
    },
    error:{
        color:"red"
    }
})