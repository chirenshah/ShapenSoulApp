import React, { Component } from 'react';
import { TextInput,Text, View,ActivityIndicator, TouchableWithoutFeedback, StyleSheet, Button, Keyboard } from 'react-native';
import {signout} from '../components/Fb'
import {LoginScreen} from './Login'
import {UserProfile} from './Profile'
//import { useNavigation } from '@react-navigation/native';
import {signup} from '../components/Fb'
import {Formik} from 'formik'
//import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as yup from 'yup';


export default class Test extends Component { 

    render(){
        return(
            <View style={{backgroundColor:"white",
            height:800}}>
                <View style={styles.logo}>
                <Text style={{fontSize:50}}>Shape N Soul</Text>
                </View>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() =>{Keyboard.dismiss}}>
                <Formik initialValues={{Name:"",email:"",password:"",password2:""}}
                validationSchema ={yup.object().shape({
                    Name:yup.string().required().label('Name'),
                    email:yup.string().required().email().label('email'),
                    password: yup.string().label('Password').required('Password is required')
                                .min(2, 'Seems a bit short...')
                                .max(10, 'Password character limit is 10'),
                    password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
                })}
                onSubmit={(values) => {
                    //console.log(values.Name)
                    signup(values.email,values.password,values.Name)
                }}>
                {(props) => (
                    <View>
                        <Text style={{ color: 'red' }}>{props.errors.Name && props.touched.Name}</Text>
                        <TextInput placeholder="Name" style={styles.input}
                        value={ props.values.Name }
                        onChangeText={props.handleChange("Name")}
                        autoFocus />
                        <Text style={{ color: 'red' }}>{props.errors.email && props.touched.email}</Text>
                        <TextInput placeholder="Email" style={styles.input}
                        value={ props.values.Email }
                        onChangeText={props.handleChange("Email")} 
                        onBlur={props.handleBlur('email')}
                        />
                        <TextInput placeholder="Password" style={styles.input}
                        value={ props.values.password }
                        onChangeText={props.handleChange("password")} />
                        <TextInput placeholder="Re-enter the assword" style={styles.input}
                        value={ props.values.password2 }
                        onChangeText={props.handleChange("password2")} />
                        <View style={styles.button}>
                        {props.isSubmitting ? (
                            <ActivityIndicator />
                        ) : (
                            <Button title="Submit" onPress={props.handleSubmit} />
                            )}
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