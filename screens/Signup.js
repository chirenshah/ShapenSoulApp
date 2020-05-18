import React, { Component } from 'react';
import { TextInput,Text, View, TouchableWithoutFeedback, StyleSheet, Button, Keyboard } from 'react-native';
import {signout} from '../components/Fb'
import {LoginScreen} from './Login'
import {UserProfile} from './Profile'
//import { useNavigation } from '@react-navigation/native';
import {signup} from '../components/Fb'
import {Formik} from 'formik'
//import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class Test extends Component {
    render(){
        return(
            <View style={{backgroundColor:"white",
            height:800}}>
                <View style={styles.logo}>
                <Text style={{fontSize:50}}>Shape N Soul</Text>
                </View>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() =>{Keyboard.dismiss()}}>
                <Formik initialValues={{Name:"",email:"",password:"",password2:""}}
                onSubmit={(values) => {
                    //console.log(values.Name)
                    signup(values.email,values.password,values.Name)
                }}>
                {(props) => (
                    <View>
                        <TextInput placeholder="Name" style={styles.input}
                        value={ props.values.Name }
                        onChangeText={props.handleChange("Name")} />
                        <TextInput placeholder="Email" style={styles.input}
                        value={ props.values.Email }
                        onChangeText={props.handleChange("Email")} />
                        <TextInput placeholder="Password" style={styles.input}
                        value={ props.values.password }
                        onChangeText={props.handleChange("password")} />
                        <TextInput placeholder="Re-enter the assword" style={styles.input}
                        value={ props.values.password2 }
                        onChangeText={props.handleChange("password2")} />
                        <View style={styles.button}>
                        <Button title="Signup" onPress={props.handleSubmit} />
                    </View>
                    </View>
                )}
                </Formik>
                </TouchableWithoutFeedback>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    error:{
        color:"red",
        alignSelf:"center"
    },
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
        marginTop:140,
        margin:40
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
    }
})