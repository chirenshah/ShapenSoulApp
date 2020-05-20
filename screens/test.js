import React , {Component} from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {login,subscribeToAuthChanges,signout} from '../components/Fb'

const validationSchema = yup.object().shape({
  Name:yup.string().required().label('Name'),
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
    .max(14, 'Password character limit is 10'),
password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
}); 

export default class Test extends Component{

    state={
        error:"",
        submit:true
    }

    componentDidMount(){
        subscribeToAuthChanges(this.authStateChanged)
    }

    authStateChanged=(user) =>{
        if(user){
            console.log(user)
            //this.props.navigation.navigate("Home");
        }
    }

    popup = (error) => {
        console.log(error)
        this.setState({
            error:error.message
        })
    }

    render(){
        return(
            <SafeAreaView style={{ marginTop: 50 }}>
                <View style={styles.logo}>
                    <Text style={{fontSize:50}}>Shape N Soul</Text>
              </View>
              <Formik
                initialValues={{email:"",password:""}}
                onSubmit={(values, actions) => {
                  login(values.email,values.password,this.popup)
                  if(this.state.error == ''){
                    //add navigation code here
                  }
                  actions.setSubmitting(false)
                }}
                validationSchema={validationSchema}
              >
                {formikProps => (
                  <React.Fragment>
                    <View style={styles.container}>
                      <TextInput
                        placeholder="Email"
                        style={styles.input}
                        onChangeText={formikProps.handleChange('email')}
                        onBlur={formikProps.handleBlur('email')}
                        
                      />
                      <Text style={styles.error}>
                        {formikProps.touched.email && formikProps.errors.email || this.state.error} 
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
    container:{
        marginTop:280,
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
