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
import {signup} from '../components/Fb'

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

export default class signup extends Component{

    state={
        error:"",
        submit:true
    }


    popup = (error) => {
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
                initialValues={{Name:"",email:"",password:"",password2:""}}
                onSubmit={(values, actions) => {
                  signup(values.email,values.password,values.Name,this.popup)
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
                        placeholder="Name"
                        style={styles.input}
                        onChangeText={formikProps.handleChange('Name')}
                        onBlur={formikProps.handleBlur('Name')}
                        autoFocus
                        returnKeyType="next"
                      />
                      <Text style={styles.error}>
                        {formikProps.touched.Name && formikProps.errors.Name}
                      </Text>
          
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
          
                      <TextInput
                        placeholder="Re-enter password"
                        style={styles.input}
                        onChangeText={formikProps.handleChange('password2')}
                        onBlur={formikProps.handleBlur('password2')}
                        secureTextEntry
                      />
                      <Text style={styles.error}>
                        {formikProps.touched.password2 && formikProps.errors.password2}
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
        marginTop:80,
        marginBottom:60
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
