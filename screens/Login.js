import React , {Component} from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {login,subscribeToAuthChanges,signInWithPhoneNumber,signout,confirmCode} from '../components/Fb'

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
  .max(10000000000,'Seems too large')
  .required('A phone number is required'),
  //otp:yup.number('Doesnt Seem like a Number').required()
});

export default class LoginScreen extends Component{

    state={
        error:"",
        submit:false,
        phone:true,
        button:"SEND OTP",
        switch:"Login with Email",
        confirm:null
    }

    componentDidMount(){
        subscribeToAuthChanges(this.authStateChanged)
    }

    authStateChanged=(user) =>{
        if(user){
          this.props.navigation.replace('Profile')
        }
    }

    popup = (error) => {
      console.log(error)
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
      switch:foo,
      error:''
    })}

    problem = (error) =>{
      console.log(error)
      this.setState({
        error:error.message,
        button:'Resend Otp'
       })
     }

    otp = (confirmation,button) => {
      this.setState({
      confirm:confirmation,
      button:button
    })}
    render(){
        return(
            <SafeAreaView style={{ marginTop: 50 }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.logo}>
                    <Text style={{fontSize:50}}>Shape N Soul</Text>
                </View>
              </TouchableWithoutFeedback> 
              {this.state.phone ? (<TouchableWithoutFeedback onPress={Keyboard.dismiss}><View>
                <Formik
                initialValues={{phone:"+91",otp:""}}
                onSubmit={(values, actions) => {
                    if(this.state.button !== "Confirm OTP"){
                      signInWithPhoneNumber('+91'+values.phone,this.otp)
                      Keyboard.dismiss()
                      actions.setSubmitting(false)
                    }
                    else{
                      if(values.otp !== '')
                      confirmCode(values.otp,this.state.confirm,this.problem)
                      else{
                        this.setState({
                        error:'Otp is required'
                      })
                    }
                    actions.setSubmitting(false)
                    }
                }}
                validationSchema={phoneValidation}>
                {formikProps => (
                  <React.Fragment>
                    <View style={styles.container}>
                      <Text style={styles.text}>Phone Number</Text>
                      <TextInput
                        placeholder="ex. 9876543210"
                        style={styles.input}
                        onChangeText={formikProps.handleChange('phone')}
                        onBlur={formikProps.handleBlur('phone')}
                        keyboardType="phone-pad"
                      />
                      <Text style={styles.error}>
                        {formikProps.touched.phone && formikProps.errors.phone || this.state.error} 
                      </Text>
                      {this.state.button !== "Confirm OTP" ? (null):(<TextInput
                        placeholder="OTP"
                        style={styles.otp}
                        onChangeText={formikProps.handleChange('otp')}
                        onBlur={formikProps.handleBlur('otp')}
                        keyboardType="phone-pad"/>
                        )}
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
              </View></TouchableWithoutFeedback>):(<TouchableWithoutFeedback onPress={Keyboard.dismiss}><View>
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
                  Keyboard.dismiss()
                }}
                validationSchema={validationSchema}
              >
                {formikProps => (
                  <React.Fragment>
                    <View style={styles.container}>
                    <Text style={styles.text}>Email</Text>
                    {this.state.error ? (<Text style={styles.error}>
                        {this.state.error} 
                      </Text>):(null)}
                      <TextInput
                        placeholder="eg. john@doe.com"
                        style={styles.input}
                        onChangeText={formikProps.handleChange('email')}
                        onBlur={formikProps.handleBlur('email')}
                      />
                      <Text style={styles.error}>
                        {formikProps.touched.email && formikProps.errors.email || this.state.error} 
                      </Text>
                      <Text style={[styles.text,{marginTop:20}]}>Password</Text>
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
              </View></TouchableWithoutFeedback>)}
              <TouchableOpacity onPress={this.switch}>
                    <Text style={styles.switch}>{this.state.switch}</Text>
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
        marginTop:150,
        margin:20,
        padding:30,
        borderWidth:1,
        borderColor:"white",
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
      fontSize:15
    },
    text:{
      alignSelf:"center",
      textAlign:"center",
      fontSize:18,
      marginBottom:15
    }
})
