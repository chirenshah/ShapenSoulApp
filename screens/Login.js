import React , {Component} from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {login,subscribeToAuthChanges,loginPhone,signout} from '../components/Fb'
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(6, 'Seems a bit short...')
    .max(14, 'Password character limit is 10')
});

const phoneValidation = yup.object().shape({
  phone: yup.number()
  .typeError("That doesn't look like a phone number")
  .positive("A phone number can't start with a minus")
  .integer("A phone number can't include a decimal point")
  .min(999999999,'Seems a bit Short')
  .required('A phone number is required')
});

export default class Test extends Component{

    state={
        error:"",
        submit:true,
        phone:true,
        button:"SEND OTP",
        switch:"Login with Email"
    }

    componentDidMount(){
        subscribeToAuthChanges(this.authStateChanged)
    }

    authStateChanged=(user) =>{
        if(user){
            //this.props.navigation.navigate("Home");
        }
    }

    popup = (error) => {
        this.setState({
            error:error.message
        })
    }
    switch = ()=>{
      var bool
      var foo
      if(this.state.phone){
        bool=false
        foo = "Login with Phone"}
        else{
          bool=true
          foo="Login with Email"
        }
      this.setState({
      phone:bool,
      switch:foo
    })}
    render(){
        return(
            <SafeAreaView style={{ marginTop: 50 }}>
                <View style={styles.logo}>
                    <Text style={{fontSize:50}}>Shape N Soul</Text>
              </View>
              {this.state.phone ? (<View>
                <Formik
                initialValues={{phone:"",otp:""}}
                onSubmit={(values, actions) => {
                  console.log(values)
                }}
                validationSchema={phoneValidation}>
                {formikProps => (
                  <React.Fragment>
                    <View style={styles.container}>
                      <TextInput
                        placeholder="Phone Number"
                        style={styles.input}
                        onChangeText={formikProps.handleChange('phone')}
                        onBlur={formikProps.handleBlur('phone')}
                        keyboardType="numeric"
                      />
                      <Text style={styles.error}>
                        {formikProps.touched.phone && formikProps.errors.phone} 
                      </Text>
                      {this.state.button == "SEND OTP" ? (null):(<TextInput
                        placeholder="OTP"
                        style={styles.otp}
                        onChangeText={formikProps.handleChange('otp')}
                        onBlur={formikProps.handleBlur('otp')}
                      />)} 
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <View style={styles.button}>
                      <Button title={this.state.button} onPress={formikProps.handleSubmit} />
                      </View>)}
                      </View>
                  </React.Fragment>
                )}
              </Formik>
              </View>):(<View>
                <Formik
                initialValues={{email:"",password:""}}
                onSubmit={(values, actions) => {
                  login(values.email,values.password,this.popup)
                  if(this.state.error == ''){
                    //add navigation code here
                  }
                  else{
                    actions.setSubmitting(false)
                  }
                  
                }}
                validationSchema={validationSchema}
              >
                {formikProps => (
                  <React.Fragment>
                    <View style={styles.container}>
                    <Text style={styles.error}>
                        {this.state.error} 
                      </Text>
                      <TextInput
                        placeholder="Email"
                        style={styles.input}
                        onChangeText={formikProps.handleChange('email')}
                        onBlur={formikProps.handleBlur('email')}
                        
                      />
                      <Text style={styles.error}>
                        {formikProps.touched.email && formikProps.errors.email} 
                      </Text>
                      <TextInput
                        placeholder="Password"
                        style={styles.input}
                        onChangeText={formikProps.handleChange('password')}
                        onBlur={formikProps.handleBlur('password')}
                        secureTextEntry
                      />
                      <Text style={styles.error}>
                        {formikProps.touched.password && formikProps.errors.password}
                      </Text>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <View style={styles.button}>
                      <Button title="Submit" onPress={formikProps.handleSubmit} />
                      </View>)}
                      </View>
                  </React.Fragment>
                )}
              </Formik>
              </View>)}
              <TouchableOpacity style={styles.switch} onPress={this.switch}>
                    <Text>{this.state.switch}</Text>
              </TouchableOpacity>
            </SafeAreaView>
          )
    }
}

const styles = StyleSheet.create({
    error:{
        color:"red",
        alignSelf:"center",
        textAlign:"center"
    },
    input:{
        alignSelf:'center',
        width:300,
        margin:20,
        height:50,
        textAlign:"center",
        backgroundColor:"#e8eeef"
    },
    otp:{
      alignSelf:'center',
      width:150,
      height:50,
      textAlign:"center",
      backgroundColor:"#e8eeef",
      margin:20
    },
    container:{
        marginTop:200,
        margin:40,
        borderWidth:1,
        borderColor:"white"
    },
    logo:{
        marginTop:100,
        alignSelf:"center"
    },
    button:{
        alignSelf:"center",
        width:200,
    },
    switch:{
      alignSelf:"center",
      width:300,
      textAlign:"center",
      marginLeft:200,
      fontSize:25
    }
})
